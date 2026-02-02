// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import { defineConfig } from 'eslint/config';
import marigoldBaseConfig from '@marigold/eslint-config';

export default defineConfig([
  marigoldBaseConfig,
  // start overriding specific config/rules for marigold
  {
    rules: {
      'react/display-name': 'off', // appears where we use forwardRef
    },
  },
  {
    languageOptions: {
      globals: {
        React: 'writable',
      },
    },
  },
  // end overriding specific config/rules for marigold
  {
    files: ['config/**/*.js', 'docs/scripts/**/*.mjs', 'themes/**/*.js'],
    rules: {
      'no-empty': 'off',
      'no-redeclare': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off',
    },
  },
  {
    ignores: [
      '**/.next',
      '**/out',
      '**/storybook-static',
      '**/docs/.contentlayer/**/**/*.{mjs,d.ts}',
      '**/docs/.registry/**',
      '**/docs/content/.eslintrc.js',
      '**/coverage',
      'packages/types/src/**',
      '**/.cache',
      'public/**',
      '.storybook/main.ts',
      '.storybook/vitest.setup.ts',
      'fumadocs/.source/**',
      'fumadocs/.registry/**',
      '.claude/**',
    ],
  },
]);
