import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

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
    /*
     * Installable PWA: the plugin writes manifest.webmanifest, links it from
     * index.html and generates the service worker (Workbox). start_url and
     * scope follow `base`. The service worker updates itself on the next visit.
     * The icons use the provisional amber mark of the favicon until the logo exists.
     */
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        id: '/',
        name: 'Áureo Estudio Fotográfico',
        short_name: 'Áureo',
        description:
          'Áureo Estudio Fotográfico. Lo extraordinario, más allá de lo evidente. Naturaleza, paisaje, retrato, moda, arquitectura, interiores, eventos y producto.',
        lang: 'es-CO',
        dir: 'ltr',
        display: 'standalone',
        theme_color: '#120F0D',
        background_color: '#120F0D',
        categories: ['photography'],
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // App shell only; photos and fonts are cached the first time they are used.
        globPatterns: ['**/*.{js,css,html,svg}', 'pwa-*.png'],
        navigateFallback: 'index.html',
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'font',
            handler: 'CacheFirst',
            options: {
              cacheName: 'fonts',
              expiration: { maxEntries: 40, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'photos',
              expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
    }),
  ],
});
