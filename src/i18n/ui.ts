import type { Language } from './config';

export const ui = {
  ua: {
    siteName: 'Асоціація акушерів-гінекологів Одеської області',
    shortName: 'ААГУ Одеса',
    description:
      'Професійна медична асоціація, що підтримує акушерів-гінекологів, освіту, дослідження та співпрацю в Одеському регіоні.',
    nav: {
      association: 'Асоціація',
      news: 'Новини',
      events: 'Події',
      projects: 'Проєкти',
      documents: 'Документи',
      contacts: 'Контакти',
    },
    common: {
      contact: 'Зв’язатися',
      allNews: 'Усі новини',
      allEvents: 'Усі події',
      allDocuments: 'Усі документи',
      allProjects: 'Усі проєкти',
      skipToContent: 'Перейти до контенту',
    },
  },
  en: {
    siteName: 'Association of Obstetricians and Gynecologists of Odessa Region',
    shortName: 'AAGU Odessa',
    description:
      'Professional medical association supporting obstetricians, gynecologists, education, research, and healthcare collaboration in the Odessa region.',
    nav: {
      association: 'Association',
      news: 'News',
      events: 'Events',
      projects: 'Projects',
      documents: 'Documents',
      contacts: 'Contacts',
    },
    common: {
      contact: 'Contact',
      allNews: 'All news',
      allEvents: 'All events',
      allDocuments: 'All documents',
      allProjects: 'All projects',
      skipToContent: 'Skip to content',
    },
  },
} as const;

export function useTranslations(lang: Language) {
  return ui[lang];
}