import { defaultLanguage, type Language } from './config';

export const routeMap = {
  home: {
    ua: '/ua/',
    en: '/en/',
  },
  association: {
    ua: '/ua/association/',
    en: '/en/association/',
  },
  news: {
    ua: '/ua/news/',
    en: '/en/news/',
  },
  events: {
    ua: '/ua/events/',
    en: '/en/events/',
  },
  projects: {
    ua: '/ua/projects/',
    en: '/en/projects/',
  },
  documents: {
    ua: '/ua/documents/',
    en: '/en/documents/',
  },
  contacts: {
    ua: '/ua/contacts/',
    en: '/en/contacts/',
  },
} as const;

export type RouteKey = keyof typeof routeMap;

export function getRoute(route: RouteKey, lang: Language = defaultLanguage) {
  return routeMap[route][lang];
}

export function getAlternateRoute(route: RouteKey, lang: Language) {
  return routeMap[route][lang];
}