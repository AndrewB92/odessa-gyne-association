import { defaultLanguage, type Language } from '../i18n/config';
import { useTranslations } from '../i18n/ui';

export const site = {
  url: 'https://odessa-gyne-association.pages.dev',
  email: 'office@aagu.od.ua',
  phone: '',
  address: 'Одеса, Україна',
  defaultOgImage: '/og-image.jpg',
} as const;

export function getSite(lang: Language = defaultLanguage) {
  const t = useTranslations(lang);

  return {
    ...site,
    name: t.siteName,
    shortName: t.shortName,
    description: t.description,
    locale: lang === 'ua' ? 'uk' : 'en',
  };
}