import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    extends: ['eslint:recommended', 'prettier'],
  },
  tseslint.configs.recommended,
]);
