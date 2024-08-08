import tailwindTypography from '@tailwindcss/typography';
import tailwindForms from '@tailwindcss/forms';


/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [
    tailwindTypography({
      target: 'modern',
    }),
    tailwindForms({
      strategy: 'base',
    }),
  ]
}
