# Odessa Association of Obstetricians and Gynecologists

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/small.svg)](https://astro.build)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Decap CMS](https://img.shields.io/badge/Decap_CMS-Enabled-FF0082?style=for-the-badge)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-Deployed-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)

![Repo Size](https://img.shields.io/github/repo-size/AndrewB92/odessa-gyne-association?style=for-the-badge)
![License](https://img.shields.io/github/license/AndrewB92/odessa-gyne-association?style=for-the-badge)
![Last Commit](https://img.shields.io/github/last-commit/AndrewB92/odessa-gyne-association?style=for-the-badge)
![Issues](https://img.shields.io/github/issues/AndrewB92/odessa-gyne-association?style=for-the-badge)

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
