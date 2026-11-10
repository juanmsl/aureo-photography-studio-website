import { defineConfig, globalIgnores } from 'eslint/config';
import EslintConfig from 'polpo-eslint-config/react';

export default defineConfig([
  /*
   * Folders that are not project code: build output and the Vercel cache
   * (Corepack downloads pnpm into .vercel/cache during the build).
   */
  globalIgnores(['dist', 'dev-dist', '.vercel']),
  ...EslintConfig,
]);
