import type { CollectionEntry } from 'astro:content';

export type Lang = 'uk' | 'en';

export type EventType = 'conference' | 'bpr';

export type EventStatus = 'past' | 'ongoing' | 'upcoming';

export type ConferenceEntry = CollectionEntry<'conferences'>;

export type BprEventEntry = CollectionEntry<'bprEvents'>;

export type EventEntry = ConferenceEntry | BprEventEntry;

export type EventDateRange = {
  start: string;
  end: string;
};

export type NormalizedEvent = {
  id: string;
  slug: string;
  type: EventType;
  title: string;
  url: string;
  external: boolean;
  externalBlank: boolean;
  status: EventStatus;
  startDate: string;
  endDate: string;
  ranges: EventDateRange[];
};