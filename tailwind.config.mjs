import tailwindTypography from '@tailwindcss/typography';
import tailwindForms from '@tailwindcss/forms';


/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Open Sans', 'Arial', 'sans-serif'],
        serif: ['Roboto Serif', 'Merriweather', 'serif'],
        mono: ['Roboto Mono', 'monospace'],
        handwriting: ['Permanent Marker', 'cursive'],
      },
      colors: {
        primary: '#7065f9',
        'primary-light': '#8f8af9',
        secondary: '#ffcc5f',
      }
    },
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
