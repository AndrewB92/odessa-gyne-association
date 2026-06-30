import type { Language } from '../i18n/config';
import { getRoute, type RouteKey } from '../i18n/routes';
import { useTranslations } from '../i18n/ui';

export type NavigationItem = {
  label: string;
  href: string;
  route: RouteKey;
};

type PrimaryRouteKey = Exclude<RouteKey, 'home'>;

const primaryRoutes: PrimaryRouteKey[] = [
  'association',
  'news',
  'events',
  'projects',
  'documents',
  'contacts',
];

export function getPrimaryNavigation(lang: Language): NavigationItem[] {
  const t = useTranslations(lang);

  return primaryRoutes.map((route) => ({
    label: t.nav[route],
    href: getRoute(route, lang),
    route,
  }));
}

export function getLanguageNavigation(route: RouteKey = 'home') {
  return [
    {
      label: 'UA',
      href: getRoute(route, 'ua'),
      lang: 'ua',
    },
    {
      label: 'EN',
      href: getRoute(route, 'en'),
      lang: 'en',
    },
  ] as const;
}