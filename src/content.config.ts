import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const localizedText = z.object({
  uk: z.string(),
  en: z.string(),
});

const speakers = defineCollection({
  loader: glob({
    pattern: "**/*.{yml,yaml}",
    base: "./src/content/speakers",
  }),
  schema: z.object({
    slug: z.string(),
    name: localizedText,
    position: localizedText,
    biography: localizedText,
    photo: z.string().optional(),
    sort: z.number().default(10),
  }),
});

const newsCategories = defineCollection({
  loader: glob({
    pattern: "**/*.{yml,yaml}",
    base: "./src/content/news-categories",
  }),
  schema: z.object({
    slug: z.string(),
    title: localizedText,
    description: localizedText.optional(),
    sort: z.number().default(10),
  }),
});

const news = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/news",
  }),
  schema: z.object({
    title: localizedText,
    slug: z.string().optional(),
    category: z.string(),
    date: z.coerce.date(),
    image: z.string().optional(),
    excerpt: localizedText.optional(),
    redirectUrl: z.string().optional(),
    redirectBlank: z.boolean().default(true),
    draft: z.boolean().default(false),
    seoTitle: localizedText.optional(),
    seoDescription: localizedText.optional(),
  }),
});

export const collections = {
  speakers,
  newsCategories,
  news,
};