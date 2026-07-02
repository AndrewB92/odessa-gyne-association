# AGENTS.md

# Odessa Association of Obstetricians and Gynecologists

## Project Overview

This project is a multilingual static website built with Astro and deployed to Cloudflare Pages.

Languages:

- Ukrainian (default)
- English

The project is SEO-first and uses static generation whenever possible.

---

# Stack

- Astro
- TypeScript
- Tailwind CSS
- Decap CMS
- Cloudflare Pages
- GitHub

---

# Project Structure

```
src/
    assets/
    components/
    content/
        speakers/
    data/
    layouts/
    pages/

public/
    admin/
    uploads/
        speakers/

functions/
    api/
```

---

# CMS

The project uses Decap CMS.

Authentication:

- GitHub OAuth
- Cloudflare Pages Functions

Configuration:

```
public/admin/config.yml
```

OAuth:

```
functions/api/auth.ts
functions/api/callback.ts
```

---

# Content

## Speakers

Speaker data is stored as YAML.

Location:

```
src/content/speakers/
```

Example:

```yaml
slug: "ihor-hladchuk"

name:
  uk: "..."
  en: "..."

position:
  uk: "..."
  en: "..."

biography:
  uk: "..."
  en: "..."

photo: "/uploads/speakers/ihor-hladchuk.webp"

sort: 10
```

Images:

```
public/uploads/speakers/
```

Do NOT place CMS-managed images inside `src/assets`.

---

# Astro Content Collections

Configuration:

```
src/content.config.ts
```

Always use Astro Content Collections.

Do not read YAML files manually.

Use:

```ts
getCollection("speakers")
```

---

# Routing

Work page:

```
/work
/en/work
```

Speaker pages:

```
/work/[slug]
/en/work/[slug]
```

Never hardcode speaker information inside pages.

Speaker pages must be generated from the content collection.

---

# Components

`SitePage.astro`

Responsible for rendering page content.

If page-specific dynamic content is required (for example speakers), inject it via props instead of duplicating page layouts.

`SpeakersGrid.astro`

Responsible only for rendering speaker cards.

It must not:

- render page headings
- render section wrappers already provided by `SitePage`

---

# Styling

Prefer:

- existing Tailwind utilities
- existing design system
- existing spacing scale

Avoid introducing separate design systems.

---

# Images

CMS uploads:

```
public/uploads/
```

Static project assets:

```
src/assets/
```

Never mix the two.

---

# SEO

Every new page should include:

- title
- description
- canonical
- OpenGraph
- proper language alternates

Do not introduce duplicate H1 elements.

---

# Development Rules

Prefer:

- reusable Astro components
- typed props
- Content Collections
- static generation

Avoid:

- duplicated page markup
- hardcoded content
- inline JavaScript unless necessary

---

# Future CMS Content

Planned CMS collections:

- Speakers
- News
- Events
- Gallery
- Partners
- SEO metadata

Follow the same architecture used by the Speakers collection.