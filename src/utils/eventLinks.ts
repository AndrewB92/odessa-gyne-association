import type {
  EventLinkMode,
  SiteLocale,
} from "../types/events";

interface GetEventUrlOptions {
  type: "conference" | "bpr";
  slug: string;
  locale: SiteLocale;
  linkMode?: EventLinkMode;
  externalUrl?: string;
  category?: string;
}

export interface EventLink {
  href: string;
  external: boolean;
  target?: "_blank";
  rel?: "noopener noreferrer";
}

function getLocalePrefix(locale: SiteLocale): string {
  return locale === "en" ? "/en" : "";
}

function normalizeExternalUrl(url?: string): string | null {
  const trimmedUrl = url?.trim();

  if (!trimmedUrl) {
    return null;
  }

  return trimmedUrl;
}

export function getConferencePath(
  slug: string,
  locale: SiteLocale,
): string {
  return `${getLocalePrefix(locale)}/conferences/${slug}/`;
}

export function getBprCategoryPath(
  category: string,
  locale: SiteLocale,
): string {
  return `${getLocalePrefix(locale)}/bpr/${category}/`;
}

export function getBprEventPath(
  category: string,
  slug: string,
  locale: SiteLocale,
): string {
  return `${getBprCategoryPath(category, locale)}${slug}/`;
}

export function getEventLink({
  type,
  slug,
  locale,
  linkMode = "internal",
  externalUrl,
  category,
}: GetEventUrlOptions): EventLink {
  const normalizedExternalUrl = normalizeExternalUrl(externalUrl);

  if (linkMode === "external" && normalizedExternalUrl) {
    return {
      href: normalizedExternalUrl,
      external: true,
      target: "_blank",
      rel: "noopener noreferrer",
    };
  }

  if (type === "conference") {
    return {
      href: getConferencePath(slug, locale),
      external: false,
    };
  }

  if (!category) {
    throw new Error(
      `Cannot generate a BPR event URL for "${slug}" without a category.`,
    );
  }

  return {
    href: getBprEventPath(category, slug, locale),
    external: false,
  };
}