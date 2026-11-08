import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  /*
   * Ruta base del sitio. En GitHub Pages la define el workflow de despliegue
   * (p. ej. "/nombre-del-repo/"); en local es la raíz.
   */
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
});
