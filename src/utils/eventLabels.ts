import type {
  EventFormat,
  SiteLocale,
} from "../types/events";

interface EventLabels {
  dates: string;
  location: string;
  locations: string;
  format: string;
  category: string;
  bprPoints: string;
  providerNumber: string;
  registrationDeadline: string;
  online: string;
  offline: string;
  hybrid: string;
  open: string;
  openExternal: string;
  materials: string;
  upcoming: string;
  ongoing: string;
  past: string;
  noLocation: string;
}

const EVENT_LABELS: Record<SiteLocale, EventLabels> = {
  uk: {
    dates: "Дата проведення:",
    location: "Місце проведення:",
    locations: "Місця проведення:",
    format: "Формат:",
    category: "Категорія",
    bprPoints: "Балів БПР:",
    providerNumber: "Номер провайдера:",
    registrationDeadline: "Реєстрація до:",
    online: "Онлайн",
    offline: "Офлайн",
    hybrid: "Гібридний",
    open: "Докладніше",
    openExternal: "Відкрити сайт",
    materials: "Матеріали заходу",
    upcoming: "Майбутній захід",
    ongoing: "Захід триває",
    past: "Завершений захід",
    noLocation: "Місце буде повідомлено додатково",
  },

  en: {
    dates: "Event date:",
    location: "Location:",
    locations: "Locations:",
    format: "Format:",
    category: "Category",
    bprPoints: "BPR points:",
    providerNumber: "Provider number:",
    registrationDeadline: "Registration deadline:",
    online: "Online",
    offline: "Offline",
    hybrid: "Hybrid",
    open: "View details",
    openExternal: "Open website",
    materials: "Event materials",
    upcoming: "Upcoming event",
    ongoing: "Event in progress",
    past: "Completed event",
    noLocation: "Location to be announced",
  },
};

export function getEventLabels(
  locale: SiteLocale,
): EventLabels {
  return EVENT_LABELS[locale];
}

export function getEventFormatLabel(
  format: EventFormat,
  locale: SiteLocale,
): string {
  const labels = getEventLabels(locale);

  return labels[format];
}