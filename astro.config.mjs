import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';


// https://astro.build/config
export default defineConfig({
  site: 'https://michal-ilyayev.github.io',
  compressHTML: true,
  trailingSlash: 'always',

  integrations: [

    // https://docs.astro.build/en/guides/integrations-guide/tailwind/
    tailwind(),

    // https://docs.astro.build/en/guides/integrations-guide/sitemap/
    sitemap()
  ]
});