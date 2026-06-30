export const languages = {
  ua: 'Українська',
  en: 'English',
} as const;

export type Language = keyof typeof languages;

export const defaultLanguage: Language = 'ua';

export const languageList = Object.keys(languages) as Language[];

export function isLanguage(value: string | undefined): value is Language {
  return Boolean(value && value in languages);
}