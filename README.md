# Odessa Association of Obstetricians and Gynecologists

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/small.svg)](https://astro.build)
![Astro](https://img.shields.io/badge/Astro-7-BC52EE?style=flat-square&logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Enabled-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Decap CMS](https://img.shields.io/badge/Decap_CMS-Enabled-FF0082?style=flat-square)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-Deployed-F38020?style=flat-square&logo=cloudflare&logoColor=white)

A modern bilingual website and structured content archive for the Odesa Branch of the Association of Obstetricians and Gynecologists of Ukraine.

The project replaces the previous website with a faster, easier-to-navigate system for publishing association information, news, conferences, continuing professional development events, speaker profiles, documents and other professional materials.

## Links

- **Staging website:** https://odessa-gyne-association.pages.dev/
- **Previous website:** https://ov.aagu.od.ua/
- **CMS:** https://odessa-gyne-association.pages.dev/admin/
- **Repository:** https://github.com/AndrewB92/odessa-gyne-association

## Project goals

The website was rebuilt to:

- separate different types of content into clear sections;
- preserve the association's professional and educational archive;
- make older materials easier to find and reuse;
- provide complete Ukrainian and English versions;
- simplify content editing through Decap CMS;
- improve performance, accessibility and mobile usability;
- provide consistent page structures and metadata;
- create a maintainable foundation for future development.

## Main features

### Bilingual website

The website supports Ukrainian and English content, navigation, metadata and URLs.

Ukrainian pages use the default routes, while English pages use the `/en/` prefix.

### News archive

News content includes:

- category archives;
- individual post pages;
- publication and update dates;
- cover images and alternative text;
- bilingual excerpts and article bodies;
- photo galleries;
- embedded YouTube videos;
- internal or external destinations;
- featured and draft states;
- custom SEO titles and descriptions.

### Conferences

Conference entries support:

- one or multiple dates;
- locations and event format;
- internal or external links;
- downloadable resources;
- organising committee information;
- key speakers;
- multi-day programmes;
- speaker abstracts;
- bilingual content and SEO metadata;
- featured and draft states.

### Continuing professional development (BPR)

BPR events are maintained separately from news and conferences.

They support:

- event categories;
- dates and registration deadlines;
- online, offline and hybrid formats;
- locations;
- BPR points;
- provider number;
- related resources;
- internal and external event links;
- bilingual descriptions and full content;
- SEO metadata;
- featured and draft states.

### Speaker directory

Each speaker can have:

- a stable URL slug;
- Ukrainian and English names;
- Ukrainian and English positions;
- formatted bilingual biographies;
- a profile photo;
- a custom display order;
- an individual profile page.

### Event statistics and calendar

The website can derive event information from the conference and BPR collections and display:

- counts of past and upcoming events;
- a compact monthly calendar;
- event markers on relevant dates;
- links from calendar entries to event pages.

### Content management

Decap CMS provides a browser-based editor for the project's structured content.

Editors can manage:

- speakers;
- news categories;
- news posts;
- conferences;
- BPR categories;
- BPR events;
- images and downloadable files;
- bilingual body content;
- SEO fields;
- publication and draft settings.

CMS changes are stored as files in the Git repository, keeping content versioned together with the website.

## Content model

Astro Content Collections validate all structured content during development and production builds.

```text
src/content/
├── speakers/          # Speaker profiles in YAML
├── news-categories/   # News category definitions in YAML
├── news/              # News posts in Markdown
├── conferences/       # Conference pages in Markdown
├── bpr-categories/    # BPR category definitions in YAML
└── bpr-events/        # BPR event pages in Markdown
```

The schemas are defined in:

```text
src/content.config.ts
```

Invalid dates, unsupported event formats, missing required fields and other structural problems are detected during the build.

## Project structure

```text
.
├── public/
│   ├── admin/             # Decap CMS interface and configuration
│   ├── uploads/           # CMS-managed media
│   └── ...                # Public static files
├── src/
│   ├── assets/            # Source images and local assets
│   ├── components/        # Reusable Astro components
│   ├── content/           # Structured website content
│   ├── data/              # Shared static data
│   ├── layouts/           # Page layouts and shared metadata
│   ├── pages/             # Ukrainian and English routes
│   ├── styles/            # Global and shared styles
│   └── utils/             # Content, date and URL helpers
├── astro.config.mjs
├── src/content.config.ts
└── package.json
```

## Technology

- [Astro 7](https://astro.build/) for static rendering and routing;
- TypeScript for safer component and content logic;
- Astro Content Collections with Zod validation;
- Markdown and YAML for portable, version-controlled content;
- Decap CMS for editorial content management;
- `marked` for rendering selected Markdown fields;
- Cloudflare Pages for hosting and deployment;
- GitHub for source control and content history.

The public website is statically generated. This keeps runtime JavaScript limited and helps pages remain fast on older phones and computers.

## Requirements

- Node.js `22.12.0` or newer;
- npm;
- Git.

## Local development

Clone the repository:

```bash
git clone https://github.com/AndrewB92/odessa-gyne-association.git
cd odessa-gyne-association
```

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Astro will print the local URL, normally:

```text
http://localhost:4321/
```

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Generate the production website |
| `npm run preview` | Preview the generated production build locally |
| `npm run astro -- --help` | Display Astro CLI commands |

## Production build

Run:

```bash
npm run build
```

The generated static website is written to:

```text
dist/
```

A successful build also validates the content collections. Content schema errors must be fixed before deployment.

## CMS configuration

The Decap CMS configuration is located at:

```text
public/admin/config.yml
```

The CMS uses GitHub as its backend and commits editorial changes to the `main` branch.

Media uploaded through the CMS is stored in:

```text
public/uploads/
```

and is publicly available under:

```text
/uploads/
```

The CMS authentication endpoint is provided by the deployed website.

## Deployment

The project is deployed to Cloudflare Pages.

The production workflow is:

1. Changes are committed and pushed to GitHub.
2. Cloudflare Pages detects the update.
3. The project runs `npm run build`.
4. The generated `dist/` directory is published.

Recommended Cloudflare Pages settings:

```text
Build command: npm run build
Build output directory: dist
Node.js version: 22.12.0 or newer
Production branch: main
```

## Content editing guidelines

When adding or updating content:

- complete both Ukrainian and English fields whenever possible;
- keep slugs short, lowercase and stable;
- do not change a published slug without adding a redirect plan;
- use ISO dates in the source files;
- provide meaningful alternative text for images;
- use the correct collection instead of treating every item as news;
- keep drafts marked with `draft: true` until ready;
- verify external links and downloadable resources;
- run a production build before merging substantial changes.

## Current content separation

The project intentionally treats these as separate entities:

- **News** — announcements, reports and association updates;
- **Conferences** — conference archives, programmes and speaker materials;
- **BPR events** — continuing professional development events and related accreditation data;
- **Speakers** — reusable professional profiles;
- **Categories** — structured filters for news and BPR archives.

This prevents the content archive from becoming one long, difficult-to-search list.

## Status

The core website, bilingual routing, structured content collections and CMS integration are implemented.

Current development is focused on:

- completing and reviewing migrated archive content;
- improving editorial documentation;
- checking English translations;
- refining accessibility and SEO metadata;
- expanding reusable content relationships where they provide clear editorial value.

## License

No public reuse license is currently declared. Website content, branding and association materials remain the property of their respective owners.
