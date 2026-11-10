import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { seoPlugin } from './build/seo-plugin';

export default defineConfig({
  /*
   * Site base path. On GitHub Pages the deploy workflow sets it
   * (e.g. "/repo-name/"); locally it is the root.
   */
  base: process.env.BASE_PATH || '/',
  plugins: [
    react(),
    tailwindcss(),
    // One HTML file per indexable route, 404.html and sitemap.xml (see build/seo-plugin.ts).
    seoPlugin(),
  ],
});
