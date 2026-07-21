import type {
  EventStatus,
  EventType,
  NormalizedEvent,
} from './types';

export type EventStatusCounts = Record<EventStatus, number>;

export type EventStatistics = Record<
  EventType,
  EventStatusCounts
>;

function createEmptyStatusCounts(): EventStatusCounts {
  return {
    past: 0,
    ongoing: 0,
    upcoming: 0,
  };
}

export function createEmptyEventStatistics(): EventStatistics {
  return {
    conference: createEmptyStatusCounts(),
    bpr: createEmptyStatusCounts(),
  };
}

export function getEventStatistics(
  events: NormalizedEvent[],
): EventStatistics {
  return events.reduce<EventStatistics>(
    (statistics, event) => {
      statistics[event.type][event.status] += 1;

      return statistics;
    },
    createEmptyEventStatistics(),
  );
}

export function getEventCountByType(
  events: NormalizedEvent[],
  type: EventType,
): number {
  return events.reduce((count, event) => {
    return event.type === type ? count + 1 : count;
  }, 0);
}

export function getEventCountByStatus(
  events: NormalizedEvent[],
  status: EventStatus,
): number {
  return events.reduce((count, event) => {
    return event.status === status ? count + 1 : count;
  }, 0);
}

export function getTotalEventCount(
  statistics: EventStatistics,
): number {
  return (
    statistics.conference.past +
    statistics.conference.ongoing +
    statistics.conference.upcoming +
    statistics.bpr.past +
    statistics.bpr.ongoing +
    statistics.bpr.upcoming
  );
}