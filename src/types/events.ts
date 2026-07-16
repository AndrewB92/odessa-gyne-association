export type SiteLocale = "uk" | "en";

export type EventFormat = "online" | "offline" | "hybrid";

export type EventLinkMode = "internal" | "external";

export interface LocalizedText {
  uk: string;
  en: string;
}

export interface OptionalLocalizedText {
  uk?: string;
  en?: string;
}

export interface EventScheduleItem {
  start: Date;
  end?: Date;
}

export interface EventLocation {
  uk: string;
  en: string;
}

export interface EventResource {
  icon: string;
  title: LocalizedText;
  url: string;
  newTab: boolean;
}

export interface BaseEventData {
  slug: string;
  title: LocalizedText;
  excerpt?: OptionalLocalizedText;
  schedule: EventScheduleItem[];
  locations: EventLocation[];
  format: EventFormat;
  linkMode: EventLinkMode;
  externalUrl?: string;
  externalBlank: boolean;
  resources: EventResource[];
  bodyUk?: string;
  bodyEn?: string;
  featured: boolean;
  draft: boolean;
  seoTitle?: OptionalLocalizedText;
  seoDescription?: OptionalLocalizedText;
}

export type ConferenceProgrammeItemType = "session" | "break";

export interface ConferenceKeySpeaker {
  photo?: string;
  name: LocalizedText;
  description: LocalizedText;
}

export interface ConferenceProgrammeItem {
  type: ConferenceProgrammeItemType;
  start?: string;
  end?: string;
  title?: OptionalLocalizedText;
  description?: OptionalLocalizedText;
}

export interface ConferenceProgrammeDay {
  day: LocalizedText;
  items: ConferenceProgrammeItem[];
}

export interface ConferenceSpeakerAbstract {
  name: LocalizedText;
  description: LocalizedText;
}

export interface ConferenceData extends BaseEventData {
  organizingCommitteeUk?: string;
  organizingCommitteeEn?: string;
  keySpeakers: ConferenceKeySpeaker[];
  programme: ConferenceProgrammeDay[];
  speakerAbstracts: ConferenceSpeakerAbstract[];
}

export interface BprEventData extends BaseEventData {
  category: string;
  bprPoints?: number;
  providerNumber?: string;
  registrationDeadline?: Date;
}

export interface BprCategoryData {
  slug: string;
  title: LocalizedText;
  description?: OptionalLocalizedText;
  sort: number;
  draft: boolean;
  seoTitle?: OptionalLocalizedText;
  seoDescription?: OptionalLocalizedText;
}
