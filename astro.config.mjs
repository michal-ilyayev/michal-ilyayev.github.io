import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';


// https://astro.build/config
export default defineConfig({
  site: 'https://michal-ilyayev.github.io',
  compressHTML: true,
  trailingSlash: 'always',

  integrations: [

    // https://docs.astro.build/en/guides/integrations-guide/sitemap/
    sitemap(),

    // https://docs.astro.build/en/guides/integrations-guide/mdx/
    // https://docs.astro.build/en/guides/markdown-content/#configuring-markdown-and-mdx
    mdx(),

    // https://docs.astro.build/en/guides/integrations-guide/tailwind/
    tailwind(),

    // https://iconify.design/
    // https://www.astroicon.dev/reference/configuration/
    icon({
      iconDir: 'src/assets/icons',
      include: {
        'fa-solid': ['*'],
        'mdi': ['*']
      }
    }),

    // https://docs.astro.build/en/guides/integrations-guide/react/
    react({
      experimentalReactChildren: true
    })
  ],
  build: {
    assets: 'assets'
  }
});