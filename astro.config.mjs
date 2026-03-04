import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://msaltnet.github.io',
  base: '/nanobot-on-rpi/',
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
