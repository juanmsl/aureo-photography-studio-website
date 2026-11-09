import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  /*
   * Site base path. On GitHub Pages the deploy workflow sets it
   * (e.g. "/repo-name/"); locally it is the root.
   */
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
});
