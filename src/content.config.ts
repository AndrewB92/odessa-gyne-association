import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { getYouTubeVideoId } from "./utils/youtube";

const localizedText = z.object({
  uk: z.string(),
  en: z.string(),
});

const optionalLocalizedText = z
  .object({
    uk: z.string().optional(),
    en: z.string().optional(),
  })
  .optional();

const newsGalleryItem = z.object({
  image: z.string().min(1),
  alt: localizedText,
  caption: optionalLocalizedText,
});

const newsVideo = z.object({
  url: z
    .string()
    .url()
    .refine((url) => getYouTubeVideoId(url) !== null, {
      message: "Enter a valid YouTube video URL.",
    }),
  title: optionalLocalizedText,
});

const eventScheduleItem = z
  .object({
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
  })
  .refine(
    ({ start, end }) => {
      if (!end) {
        return true;
      }

      return end.getTime() >= start.getTime();
    },
    {
      message: "The end date cannot be earlier than the start date.",
      path: ["end"],
    },
  );

const eventLocation = z.object({
  uk: z.string(),
  en: z.string(),
});

const eventResource = z.object({
  icon: z.string().default("link"),
  title: localizedText,
  url: z.string().min(1),
  newTab: z.boolean().default(true),
});

const eventFormat = z.enum(["online", "offline", "hybrid"]);

const eventLinkMode = z.enum(["internal", "external"]);

const conferenceKeySpeaker = z.object({
  photo: z.string().optional(),
  name: localizedText,
  description: localizedText,
});

const conferenceProgrammeItem = z.object({
  type: z.enum(["session", "break"]),
  start: z.string().optional(),
  end: z.string().optional(),
  title: optionalLocalizedText,
  description: optionalLocalizedText,
});

const conferenceProgrammeDay = z.object({
  day: localizedText,
  items: z.array(conferenceProgrammeItem).default([]),
});

const conferenceSpeakerAbstract = z.object({
  name: localizedText,
  description: localizedText,
});

const baseEventFields = {
  slug: z.string().min(1),

  title: localizedText,

  excerpt: optionalLocalizedText,

  schedule: z.array(eventScheduleItem).min(1),

  locations: z.array(eventLocation).default([]),

  format: eventFormat,

  linkMode: eventLinkMode.default("internal"),

  externalUrl: z.string().optional(),

  externalBlank: z.boolean().default(true),

  resources: z.array(eventResource).default([]),

  bodyUk: z.string().optional(),

  bodyEn: z.string().optional(),

  featured: z.boolean().default(false),

  draft: z.boolean().default(false),

  seoTitle: optionalLocalizedText,

  seoDescription: optionalLocalizedText,
};

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
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    image: z.string().optional(),
    imageAlt: optionalLocalizedText,
    excerpt: localizedText.optional(),
    redirectUrl: z.string().optional(),
    redirectBlank: z.boolean().default(true),
    gallery: z.array(newsGalleryItem).default([]),
    videos: z.array(newsVideo).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    image: z.string().optional(),
    excerpt: localizedText.optional(),
    redirectUrl: z.string().optional(),
    redirectBlank: z.boolean().default(true),
    draft: z.boolean().default(false),
    seoTitle: localizedText.optional(),
    seoDescription: localizedText.optional(),
    bodyUk: z.string().optional(),
    bodyEn: z.string().optional(),
  }),
});

const conferences = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/conferences",
  }),
  schema: z
    .object({
      ...baseEventFields,
      organizingCommitteeUk: z.string().optional(),
      organizingCommitteeEn: z.string().optional(),
      keySpeakers: z.array(conferenceKeySpeaker).default([]),
      programme: z.array(conferenceProgrammeDay).default([]),
      speakerAbstracts: z.array(conferenceSpeakerAbstract).default([]),
    })
    .superRefine(({ linkMode, externalUrl }, context) => {
      if (linkMode === "external" && !externalUrl?.trim()) {
        context.addIssue({
          code: "custom",
          message:
            "External URL is required when the conference uses an external link.",
          path: ["externalUrl"],
        });
      }
    }),
});

const bprCategories = defineCollection({
  loader: glob({
    pattern: "**/*.{yml,yaml}",
    base: "./src/content/bpr-categories",
  }),
  schema: z.object({
    slug: z.string().min(1),
    title: localizedText,
    description: optionalLocalizedText,
    sort: z.number().int().default(10),
    draft: z.boolean().default(false),
    seoTitle: optionalLocalizedText,
    seoDescription: optionalLocalizedText,
  }),
});

const bprEvents = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/bpr-events",
  }),
  schema: z
    .object({
      ...baseEventFields,

      category: z.string().min(1),

      bprPoints: z.number().nonnegative().optional(),

      providerNumber: z.string().optional(),

      registrationDeadline: z.coerce.date().optional(),
    })
    .superRefine(({ linkMode, externalUrl }, context) => {
      if (linkMode === "external" && !externalUrl?.trim()) {
        context.addIssue({
          code: "custom",
          message:
            "External URL is required when the BPR event uses an external link.",
          path: ["externalUrl"],
        });
      }
    }),
});

export const collections = {
  speakers,
  newsCategories,
  news,
  conferences,
  bprCategories,
  bprEvents,
};