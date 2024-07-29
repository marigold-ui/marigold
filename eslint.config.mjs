import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname, //
  recommendedConfig: js.configs.recommended, // Use the recommended ESLint configuration
  allConfig: js.configs.all, // Use all ESLint configurations
});

export default [
  {
    ignores: ['**/dist', '**/.next', '**/out', '**/storybook-static'], // Specify directories to ignore
  },
  ...compat.extends('@marigold/eslint-config'), // Extend the configuration from '@marigold/eslint-config'
];
