import type {
  Lang,
  NormalizedEvent,
} from './types';

export type CalendarDay = {
  date: string;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: NormalizedEvent[];
};

export type CalendarMonth = {
  year: number;
  month: number;
  label: string;
  days: CalendarDay[];
};

const DAYS_PER_WEEK = 7;
const CALENDAR_ROWS = 6;
const CALENDAR_CELL_COUNT = DAYS_PER_WEEK * CALENDAR_ROWS;

function padNumber(value: number): string {
  return String(value).padStart(2, '0');
}

export function createIsoDate(
  year: number,
  month: number,
  day: number,
): string {
  return `${year}-${padNumber(month + 1)}-${padNumber(day)}`;
}

export function parseIsoDate(date: string): {
  year: number;
  month: number;
  day: number;
} {
  const [year, month, day] = date.split('-').map(Number);

  return {
    year,
    month: month - 1,
    day,
  };
}

export function getEventsForDate(
  events: NormalizedEvent[],
  date: string,
): NormalizedEvent[] {
  return events.filter((event) =>
    event.ranges.some(
      (range) => date >= range.start && date <= range.end,
    ),
  );
}

/**
 * Converts the native Sunday-first weekday into Monday-first indexing:
 *
 * Monday = 0
 * Tuesday = 1
 * ...
 * Sunday = 6
 */
function getMondayFirstWeekday(date: Date): number {
  return (date.getUTCDay() + 6) % 7;
}

export function getCalendarMonthLabel(
  year: number,
  month: number,
  lang: Lang,
): string {
  return new Intl.DateTimeFormat(
    lang === 'en' ? 'en-GB' : 'uk-UA',
    {
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    },
  ).format(new Date(Date.UTC(year, month, 1)));
}

export function getCalendarWeekdays(
  lang: Lang,
): string[] {
  const formatter = new Intl.DateTimeFormat(
    lang === 'en' ? 'en-GB' : 'uk-UA',
    {
      weekday: 'short',
      timeZone: 'UTC',
    },
  );

  const monday = new Date(Date.UTC(2026, 0, 5));

  return Array.from({ length: DAYS_PER_WEEK }, (_, index) => {
    const date = new Date(monday);
    date.setUTCDate(monday.getUTCDate() + index);

    return formatter.format(date);
  });
}

export function createCalendarMonth({
  year,
  month,
  events,
  lang,
  today,
}: {
  year: number;
  month: number;
  events: NormalizedEvent[];
  lang: Lang;
  today: string;
}): CalendarMonth {
  const firstDay = new Date(Date.UTC(year, month, 1));
  const firstWeekday = getMondayFirstWeekday(firstDay);

  const gridStart = new Date(firstDay);
  gridStart.setUTCDate(firstDay.getUTCDate() - firstWeekday);

  const days = Array.from(
    { length: CALENDAR_CELL_COUNT },
    (_, index): CalendarDay => {
      const date = new Date(gridStart);
      date.setUTCDate(gridStart.getUTCDate() + index);

      const cellYear = date.getUTCFullYear();
      const cellMonth = date.getUTCMonth();
      const cellDay = date.getUTCDate();
      const isoDate = createIsoDate(
        cellYear,
        cellMonth,
        cellDay,
      );

      return {
        date: isoDate,
        dayNumber: cellDay,
        isCurrentMonth:
          cellYear === year && cellMonth === month,
        isToday: isoDate === today,
        events: getEventsForDate(events, isoDate),
      };
    },
  );

  return {
    year,
    month,
    label: getCalendarMonthLabel(year, month, lang),
    days,
  };
}