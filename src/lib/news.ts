import { getCollection, type CollectionEntry } from "astro:content";

export type Lang = "uk" | "en";
export type NewsPost = CollectionEntry<"news">;
export type NewsCategory = CollectionEntry<"newsCategories">;

const ukTranslitMap: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "h",
  ґ: "g",
  д: "d",
  е: "e",
  є: "ie",
  ж: "zh",
  з: "z",
  и: "y",
  і: "i",
  ї: "i",
  й: "i",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "kh",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "shch",
  ь: "",
  ю: "iu",
  я: "ia",
  "'": "",
  "’": "",
};

export function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .split("")
    .map((char) => ukTranslitMap[char] ?? char)
    .join("")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getPostSlug(post: NewsPost, lang: Lang = "uk") {
  return post.data.slug?.trim() || slugify(post.data.title[lang] || post.data.title.uk || post.id);
}

export function isExternalNewsPost(post: NewsPost) {
  return Boolean(post.data.redirectUrl?.trim());
}

export function getLocalizedPrefix(lang: Lang) {
  return lang === "en" ? "/en" : "";
}

export function getNewsPostUrl(post: NewsPost, lang: Lang) {
  const redirectUrl = post.data.redirectUrl?.trim();

  if (redirectUrl) {
    return redirectUrl;
  }

  return `${getLocalizedPrefix(lang)}/news/${post.data.category}/${getPostSlug(post, lang)}/`;
}

export function formatNewsDate(date: Date, lang: Lang) {
  return new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export async function getNewsCategories() {
  const categories = await getCollection("newsCategories");

  return categories.sort((a, b) => {
    if (a.data.sort !== b.data.sort) return a.data.sort - b.data.sort;
    return a.data.title.uk.localeCompare(b.data.title.uk);
  });
}

export async function getNewsPosts(options?: {
  category?: string;
  includeDrafts?: boolean;
}) {
  const posts = await getCollection("news", ({ data }) => {
    if (!options?.includeDrafts && data.draft) return false;
    if (options?.category && data.category !== options.category) return false;
    return true;
  });

  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getNewsCategoryMap() {
  const categories = await getNewsCategories();

  return new Map(categories.map((category) => [category.data.slug, category]));
}

export async function getNewsCategoryBySlug(slug: string) {
  const categories = await getNewsCategories();

  return categories.find((category) => category.data.slug === slug);
}