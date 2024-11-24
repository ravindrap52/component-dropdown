import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  {
    ignores: [
      'dist/**/*', // ignore all contents in and under `build/` directory but not the `build/` directory itself
    ],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
