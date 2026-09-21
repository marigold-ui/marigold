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
    // `toLocale*()` with no argument reads the JS runtime default: en-US under
    // Node, the viewer's own locale in the browser. Docs pages are server
    // rendered and then hydrated, so the two disagree and React logs a
    // hydration mismatch on every value with a grouping separator. The demo
    // wrappers pin `I18nProvider`, which `NumericFormat`/`DateFormat` read and
    // `toLocale*()` ignores.
    files: ['docs/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector:
            'CallExpression[arguments.length=0][callee.property.name=/^toLocale(String|DateString|TimeString)$/]',
          message:
            'Bare toLocale*() reads the runtime locale and mismatches on hydration. Use NumericFormat/DateFormat, or pass an explicit locale.',
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
