import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://odessa-gyne-association.pages.dev',
  output: 'static',
  integrations: [sitemap()],
});