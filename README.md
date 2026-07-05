# Odessa Association of Obstetricians and Gynecologists

Modern multilingual website built with Astro for the Odessa Association of Obstetricians and Gynecologists.

## Features

- 🇺🇦 Ukrainian & 🇬🇧 English languages
- Responsive design
- SEO-first architecture
- Decap CMS integration
- Speaker management
- Dynamic speaker pages
- Conference and event pages
- Static generation with Astro
- Cloudflare Pages deployment
- Optimized assets and performance

## Tech Stack

- Astro
- TypeScript
- Tailwind CSS
- Decap CMS
- Cloudflare Pages
- GitHub Actions

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)

## Project Structure

```text
src/
 ├── components/
 ├── content/
 │    └── speakers/
 ├── data/
 ├── layouts/
 ├── pages/
 └── assets/

public/
 ├── admin/
 └── uploads/
```

## CMS

The project uses Decap CMS for managing speaker content.

Available fields:

- Name (UA / EN)
- Position (UA / EN)
- Biography (UA / EN)
- Photo
- Sort order

Content is stored in:

```text
src/content/speakers/
```

Speaker images are uploaded to:

```text
public/uploads/speakers/
```

## Development

Install dependencies

```bash
npm install
```

Run locally

```bash
npm run dev
```

Build

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

## Deployment

The project is automatically deployed to Cloudflare Pages after every push to the main branch.

## Roadmap

- [x] Multilingual support
- [x] Responsive layouts
- [x] Decap CMS integration
- [x] Speaker management
- [x] Dynamic speaker pages
- [x] News management
- [ ] Event management
- [ ] Gallery management
- [ ] SEO editor
