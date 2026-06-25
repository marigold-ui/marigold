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
    // Stories render in the Storybook preview, which already provides `expect`,
    // `fn`, `userEvent`, etc. via `storybook/test`. A bare `vitest` import drags
    // a second test runtime into the preview and breaks it with a cryptic
    // `customEqualityTesters` error, so keep `vitest` out of story files.
    files: ['**/*.stories.tsx'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'vitest',
              message:
                'Do not import from "vitest" in stories — use "storybook/test" instead (a vitest import breaks the Storybook preview with a "customEqualityTesters" error).',
            },
          ],
        },
      ],
    },
  },
  {
    ignores: [
      '**/.next',
      '**/out',
      '**/storybook-static',
      '**/docs/.contentlayer/**/**/*.{mjs,d.ts}',
      '**/.registry/**',
      '**/docs/content/.eslintrc.js',
      '**/coverage',
      'packages/types/src/**',
      '**/.cache',
      'public/**',
      '.storybook/main.ts',
      '.storybook/vitest.setup.ts',
      'docs/.source/**',
      '.claude/**',
    ],
  },
]);
