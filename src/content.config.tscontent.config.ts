import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const speakers = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/speakers",
  }),
  schema: z.object({
    slug: z.string(),
    order: z.number().default(1),

    name: z.string(),
    nameEn: z.string(),

    role: z.string().optional(),
    roleEn: z.string().optional(),

    photo: z.string().optional(),
  }),
});

export const collections = {
  speakers,
};