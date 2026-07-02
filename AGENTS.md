# AGENTS.md

# Odessa Gynecologists Association

This document defines the engineering standards for all AI coding agents working on this repository.

## Project Overview

Official website of the Odessa Gynecologists Association.

Primary goals:

- Fast
- Accessible
- SEO-friendly
- Maintainable
- Easy to extend
- Minimal client-side JavaScript

---

# Stack

- Astro
- TypeScript
- CSS
- Cloudflare Pages

Future integrations may include:

- Decap CMS or another Git-based CMS
- Cloudflare Forms / Workers
- Analytics
- Search

Do not introduce new frameworks without a clear reason.

---

# General Principles

Always prefer:

- simplicity
- readability
- maintainability
- performance

Avoid clever code.

Write code that another developer can understand immediately.

---

# Architecture

Prefer:

```
src/
    assets/
    components/
        ui/
        layout/
        sections/
    layouts/
    pages/
    styles/
    utils/
```

Components should have a single responsibility.

Avoid deeply nested components.

---

# Astro

Prefer Astro components.

Only hydrate components when interactivity is required.

Use:

client:load
client:visible
client:idle

only when necessary.

Static HTML is preferred.

---

# TypeScript

Always use TypeScript.

Avoid:

- any
- @ts-ignore

Prefer explicit interfaces.

Use readonly where appropriate.

---

# CSS

Use plain CSS.

Do not introduce Tailwind.

Prefer:

- CSS variables
- logical properties
- modern CSS

Avoid:

- !important
- inline styles
- duplicated declarations

---

# Responsive Design

Mobile-first.

Breakpoints should be minimal.

Avoid creating unnecessary layouts for every breakpoint.

---

# Accessibility

Always use semantic HTML.

Every image must have meaningful alt text.

Buttons must be actual `<button>` elements.

Links must be actual `<a>` elements.

All forms must be keyboard accessible.

Maintain proper heading hierarchy.

---

# Performance

Every added dependency must be justified.

Avoid unnecessary JavaScript.

Optimize images.

Lazy-load only when beneficial.

Keep bundle size small.

---

# Components

Components should be:

- reusable
- composable
- predictable

Avoid giant components.

If a component becomes difficult to understand, split it.

---

# Code Style

Prefer:

- early returns
- descriptive names
- small functions
- clear interfaces

Avoid:

- nested conditionals
- duplicated code
- magic numbers

Extract repeated logic.

---

# File Naming

Components:

```
Hero.astro
Button.astro
Footer.astro
```

Utilities:

```
formatDate.ts
slugify.ts
```

CSS:

```
button.css
hero.css
```

---

# SEO

Every page should include:

- title
- description
- canonical URL
- Open Graph tags
- Twitter tags where appropriate

Use semantic HTML.

---

# Content

Content should remain separate from presentation whenever practical.

Avoid hardcoding repeated text inside components.

---

# Dependencies

Before adding a dependency ask:

- Can Astro already do this?
- Can native browser APIs do this?
- Is the dependency actively maintained?
- Is the dependency worth its size?

Prefer native solutions.

---

# Git

Keep commits focused.

Avoid unrelated changes.

Do not reformat the entire repository unless requested.

---

# Pull Requests

Changes should:

- build successfully
- pass Astro checks
- avoid regressions
- preserve existing functionality

---

# AI Agent Rules

Do not rewrite unrelated code.

Do not introduce opinionated patterns without a clear benefit.

Explain architectural decisions when making significant changes.

Prefer improving existing code over replacing it.

Keep generated code production-ready.

When uncertain, choose the simplest solution.