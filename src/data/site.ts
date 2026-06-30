export const site = {
  name: 'Association of Obstetricians and Gynecologists of Odessa Region',
  shortName: 'AAGU Odessa',
  description:
    'Professional medical association supporting obstetricians, gynecologists, education, research, and healthcare collaboration in the Odessa region.',
  url: 'https://odessa-gyne-association.pages.dev',
  locale: 'en',
  email: 'office@aagu.od.ua',
  phone: '',
  address: 'Odessa, Ukraine',
  defaultOgImage: '/og-image.jpg',
} as const;

export type SiteConfig = typeof site;