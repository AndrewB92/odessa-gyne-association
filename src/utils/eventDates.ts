import type { EventScheduleItem, SiteLocale } from "../types/events";

const DATE_LOCALES: Record<SiteLocale, string> = {
  uk: "uk-UA",
  en: "en-GB",
};

const INVALID_DATE_LABELS: Record<SiteLocale, string> = {
  uk: "Дату не вказано",
  en: "Date not specified",
};

function isValidDate(date: Date): boolean {
  return date instanceof Date && !Number.isNaN(date.getTime());
}

function normalizeDate(date: Date): Date {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
}

function isSameDay(first: Date, second: Date): boolean {
  return (
    first.getUTCFullYear() === second.getUTCFullYear() &&
    first.getUTCMonth() === second.getUTCMonth() &&
    first.getUTCDate() === second.getUTCDate()
  );
}

function isSameMonth(first: Date, second: Date): boolean {
  return (
    first.getUTCFullYear() === second.getUTCFullYear() &&
    first.getUTCMonth() === second.getUTCMonth()
  );
}

function isSameYear(first: Date, second: Date): boolean {
  return first.getUTCFullYear() === second.getUTCFullYear();
}

function formatSingleDate(date: Date, locale: SiteLocale): string {
  return new Intl.DateTimeFormat(DATE_LOCALES[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function formatDay(date: Date, locale: SiteLocale): string {
  return new Intl.DateTimeFormat(DATE_LOCALES[locale], {
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function formatDayAndMonth(date: Date, locale: SiteLocale): string {
  return new Intl.DateTimeFormat(DATE_LOCALES[locale], {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(date);
}

function formatMonthAndYear(date: Date, locale: SiteLocale): string {
  return new Intl.DateTimeFormat(DATE_LOCALES[locale], {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function formatDateRange(
  start: Date,
  end: Date,
  locale: SiteLocale,
): string {
  if (isSameDay(start, end)) {
    return formatSingleDate(start, locale);
  }

  if (isSameMonth(start, end)) {
    return `${formatDay(start, locale)}–${formatDay(end, locale)} ${formatMonthAndYear(
      end,
      locale,
    )}`;
  }

  if (isSameYear(start, end)) {
    return `${formatDayAndMonth(start, locale)} – ${formatSingleDate(
      end,
      locale,
    )}`;
  }

  return `${formatSingleDate(start, locale)} – ${formatSingleDate(
    end,
    locale,
  )}`;
}

export function sortEventSchedule(
  schedule: EventScheduleItem[],
): EventScheduleItem[] {
  return [...schedule].sort(
    (first, second) =>
      normalizeDate(first.start).getTime() -
      normalizeDate(second.start).getTime(),
  );
}

export function formatEventScheduleItem(
  item: EventScheduleItem,
  locale: SiteLocale,
): string {
  if (!isValidDate(item.start)) {
    return INVALID_DATE_LABELS[locale];
  }

  const start = normalizeDate(item.start);

  if (!item.end || !isValidDate(item.end)) {
    return formatSingleDate(start, locale);
  }

  const end = normalizeDate(item.end);

  return formatDateRange(start, end, locale);
}

export function formatEventSchedule(
  schedule: EventScheduleItem[],
  locale: SiteLocale,
): string[] {
  return sortEventSchedule(schedule).map((item) =>
    formatEventScheduleItem(item, locale),
  );
}

export function getEventStartDate(
  schedule: EventScheduleItem[],
): Date | null {
  const validItems = schedule.filter((item) => isValidDate(item.start));

  if (validItems.length === 0) {
    return null;
  }

  return normalizeDate(sortEventSchedule(validItems)[0].start);
}

export function getEventEndDate(
  schedule: EventScheduleItem[],
): Date | null {
  const dates = schedule.flatMap((item) => {
    const result: Date[] = [];

    if (isValidDate(item.start)) {
      result.push(normalizeDate(item.start));
    }

    if (item.end && isValidDate(item.end)) {
      result.push(normalizeDate(item.end));
    }

    return result;
  });

  if (dates.length === 0) {
    return null;
  }

  return dates.sort(
    (first, second) => second.getTime() - first.getTime(),
  )[0];
}

export function isPastEvent(
  schedule: EventScheduleItem[],
  now = new Date(),
): boolean {
  const endDate = getEventEndDate(schedule);

  if (!endDate) {
    return false;
  }

  const today = normalizeDate(now);

  return endDate.getTime() < today.getTime();
}

export function isUpcomingEvent(
  schedule: EventScheduleItem[],
  now = new Date(),
): boolean {
  const startDate = getEventStartDate(schedule);

  if (!startDate) {
    return false;
  }

  const today = normalizeDate(now);

  return startDate.getTime() > today.getTime();
}

export function isOngoingEvent(
  schedule: EventScheduleItem[],
  now = new Date(),
): boolean {
  const startDate = getEventStartDate(schedule);
  const endDate = getEventEndDate(schedule);

  if (!startDate || !endDate) {
    return false;
  }

  const today = normalizeDate(now);

  return (
    startDate.getTime() <= today.getTime() &&
    endDate.getTime() >= today.getTime()
  );
}