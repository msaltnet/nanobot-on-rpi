import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://nanobot.msalt.net',
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'one-dark-pro',
      },
      wrap: true,
    },
  },
});
