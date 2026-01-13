// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import { defineConfig } from 'eslint/config';
import marigoldBaseConfig from '@marigold/eslint-config';

export default defineConfig([
  // Ignores must come first in flat config
  {
    ignores: [
      '**/.next',
      '**/out',
      '**/storybook-static',
      'docs/**',
      'old-docs/**',
      '**/docs-fuma/.source/**',
      '**/docs-fuma/lib/.registry/**',
      '**/coverage',
      'packages/types/src/**',
      '**/.cache',
      'public/**',
      '**/config/storybook/.storybook/main.ts',
    ],
  },
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
    files: ['docs-fuma/**/*.{ts,tsx}'],
    rules: {
      'react-hooks/set-state-in-effect': 'off', // Intentional setState in effects for mounting/data loading
    },
  },
  {
    files: ['config/**/*.js', 'docs-fuma/scripts/**/*.mjs', 'themes/**/*.js'],
    rules: {
      'no-empty': 'off',
      'no-redeclare': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off',
    },
  },
]);
