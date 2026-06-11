import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://denisstritar.com',
  integrations: [mdx(), sitemap()],
  output: 'static',
  server: { host: '127.0.0.1' },
});
