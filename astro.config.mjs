import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';


// https://astro.build/config
export default defineConfig({
  site: 'https://michal-ilyayev.github.io',
  compressHTML: true,
  trailingSlash: 'always',

  integrations: [

    // https://docs.astro.build/en/guides/integrations-guide/tailwind/
    tailwind(),

    // https://docs.astro.build/en/guides/integrations-guide/sitemap/
    sitemap(),

    // https://docs.astro.build/en/guides/integrations-guide/react/
    react({
      experimentalReactChildren: true,
    })
  ]
});