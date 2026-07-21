import { getCollection } from 'astro:content';

import {
  getEventDateBounds,
  getEventStatus,
  normalizeDateRange,
  sortDateRanges,
} from './dates';

import type {
  BprEventEntry,
  ConferenceEntry,
  EventDateRange,
  EventType,
  Lang,
  NormalizedEvent,
} from './types';

type NormalizeEventOptions = {
  lang: Lang;
  today?: string;
};

type SharedEventData = {
  slug: string;
  title: Record<Lang, string>;
  schedule: Array<{
    start: Date;
    end?: Date;
  }>;
  linkMode: 'internal' | 'external';
  externalUrl?: string;
  externalBlank: boolean;
};

function getLocalizedPrefix(lang: Lang): string {
  return lang === 'en' ? '/en' : '';
}

function getEventTitle(
  title: Record<Lang, string>,
  lang: Lang,
): string {
  return title[lang]?.trim() || title.uk.trim();
}

function getEventRanges(
  schedule: SharedEventData['schedule'],
): EventDateRange[] {
  return sortDateRanges(
    schedule.map(({ start, end }) =>
      normalizeDateRange(start, end),
    ),
  );
}

function getInternalEventUrl(
  event: SharedEventData,
  type: EventType,
  lang: Lang,
): string {
  const prefix = getLocalizedPrefix(lang);

  if (type === 'conference') {
    return `${prefix}/conferences/${event.slug}/`;
  }

  return `${prefix}/bpr/${event.slug}/`;
}

function getEventUrl(
  event: SharedEventData,
  type: EventType,
  lang: Lang,
): string {
  const externalUrl = event.externalUrl?.trim();

  if (event.linkMode === 'external' && externalUrl) {
    return externalUrl;
  }

  return getInternalEventUrl(event, type, lang);
}

function normalizeEvent(
  entry: ConferenceEntry | BprEventEntry,
  type: EventType,
  options: NormalizeEventOptions,
): NormalizedEvent {
  const { lang, today } = options;
  const event = entry.data;
  const ranges = getEventRanges(event.schedule);
  const { startDate, endDate } = getEventDateBounds(ranges);
  const external =
    event.linkMode === 'external' &&
    Boolean(event.externalUrl?.trim());

  return {
    id: `${type}:${entry.id}`,
    slug: event.slug,
    type,
    title: getEventTitle(event.title, lang),
    url: getEventUrl(event, type, lang),
    external,
    externalBlank: external && event.externalBlank,
    status: getEventStatus(startDate, endDate, today),
    startDate,
    endDate,
    ranges,
  };
}

export function normalizeConference(
  entry: ConferenceEntry,
  options: NormalizeEventOptions,
): NormalizedEvent {
  return normalizeEvent(entry, 'conference', options);
}

export function normalizeBprEvent(
  entry: BprEventEntry,
  options: NormalizeEventOptions,
): NormalizedEvent {
  return normalizeEvent(entry, 'bpr', options);
}

export function normalizeEvents({
  conferences,
  bprEvents,
  lang,
  today,
}: {
  conferences: ConferenceEntry[];
  bprEvents: BprEventEntry[];
  lang: Lang;
  today?: string;
}): NormalizedEvent[] {
  const options: NormalizeEventOptions = {
    lang,
    today,
  };

  return [
    ...conferences.map((event) =>
      normalizeConference(event, options),
    ),
    ...bprEvents.map((event) =>
      normalizeBprEvent(event, options),
    ),
  ].sort((first, second) => {
    const dateComparison = first.startDate.localeCompare(
      second.startDate,
    );

    if (dateComparison !== 0) {
      return dateComparison;
    }

    return first.title.localeCompare(second.title, lang);
  });
}

export async function getNormalizedEvents({
  lang,
  today,
  includeDrafts = false,
}: NormalizeEventOptions & {
  includeDrafts?: boolean;
}): Promise<NormalizedEvent[]> {
  const [conferences, bprEvents] = await Promise.all([
    getCollection('conferences', ({ data }) => {
      return includeDrafts || !data.draft;
    }),

    getCollection('bprEvents', ({ data }) => {
      return includeDrafts || !data.draft;
    }),
  ]);

  return normalizeEvents({
    conferences,
    bprEvents,
    lang,
    today,
  });
}