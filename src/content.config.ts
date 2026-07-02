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

export const collections = {
  speakers,
};