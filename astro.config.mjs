import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ov.aagu.od.ua',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !/(?:^|\/)admin(?:\/|$)/i.test(new URL(page).pathname),
    }),
  ],
});
