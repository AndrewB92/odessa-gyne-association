import type {
  EventDateRange,
  EventStatus,
} from './types';

export const SITE_TIME_ZONE = 'Europe/Simferopol';

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Converts a Date into a calendar-only ISO string.
 *
 * Astro/Zod currently parses frontmatter dates into Date objects. We only
 * retain the UTC year, month and day so event status is not affected by the
 * visitor's browser timezone or by a time portion.
 */
export function toIsoDate(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * Returns today's date as YYYY-MM-DD.
 *
 * An explicit Date can be supplied for build tests and future unit tests.
 */
export function getTodayIso(
  referenceDate = new Date(),
  timeZone = SITE_TIME_ZONE,
): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(referenceDate);

  const values = Object.fromEntries(
    parts.map((part) => [part.type, part.value]),
  );

  return `${values.year}-${values.month}-${values.day}`;
}

export function isIsoDate(value: string): boolean {
  if (!ISO_DATE_PATTERN.test(value)) {
    return false;
  }

  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

/**
 * ISO calendar dates can be compared lexicographically because their most
 * significant part appears first: YYYY-MM-DD.
 */
export function compareIsoDates(first: string, second: string): number {
  return first.localeCompare(second);
}

export function normalizeDateRange(
  start: Date,
  end?: Date,
): EventDateRange {
  const startDate = toIsoDate(start);
  const endDate = end ? toIsoDate(end) : startDate;

  return {
    start: startDate,
    end: endDate,
  };
}

export function sortDateRanges(
  ranges: EventDateRange[],
): EventDateRange[] {
  return [...ranges].sort((first, second) => {
    const startComparison = compareIsoDates(first.start, second.start);

    if (startComparison !== 0) {
      return startComparison;
    }

    return compareIsoDates(first.end, second.end);
  });
}

export function getEventDateBounds(ranges: EventDateRange[]): {
  startDate: string;
  endDate: string;
} {
  if (ranges.length === 0) {
    throw new Error('An event must contain at least one date range.');
  }

  const sortedRanges = sortDateRanges(ranges);

  const startDate = sortedRanges.reduce(
    (earliest, range) =>
      compareIsoDates(range.start, earliest) < 0
        ? range.start
        : earliest,
    sortedRanges[0].start,
  );

  const endDate = sortedRanges.reduce(
    (latest, range) =>
      compareIsoDates(range.end, latest) > 0
        ? range.end
        : latest,
    sortedRanges[0].end,
  );

  return {
    startDate,
    endDate,
  };
}

export function getEventStatus(
  startDate: string,
  endDate: string,
  today = getTodayIso(),
): EventStatus {
  if (compareIsoDates(today, startDate) < 0) {
    return 'upcoming';
  }

  if (compareIsoDates(today, endDate) > 0) {
    return 'past';
  }

  return 'ongoing';
}

export function formatEventDate(
  date: string,
  lang: 'uk' | 'en',
): string {
  if (!isIsoDate(date)) {
    return date;
  }

  const [year, month, day] = date.split('-').map(Number);
  const parsedDate = new Date(Date.UTC(year, month - 1, day));

  return new Intl.DateTimeFormat(
    lang === 'en' ? 'en-GB' : 'uk-UA',
    {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'UTC',
    },
  ).format(parsedDate);
}

export function formatEventDateRange(
  startDate: string,
  endDate: string,
  lang: 'uk' | 'en',
): string {
  const formattedStart = formatEventDate(startDate, lang);

  if (startDate === endDate) {
    return formattedStart;
  }

  return `${formattedStart}–${formatEventDate(endDate, lang)}`;
}