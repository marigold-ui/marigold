import { defineConfig } from 'eslint/config';
import marigoldBaseConfig from '@marigold/eslint-config';

export default defineConfig([
  marigoldBaseConfig,
  // start disabled rules after migration to flat config
  {
    rules: {
      'react/display-name': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      'react-hooks/rules-of-hooks': 'off',
    },
  },
  {
    files: ['**/*.stories.tsx'],
    rules: {
      'react-hooks/rules-of-hooks': 'off',
    },
  },
  // end disabled rules after migration to flat config
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
      '**/docs/.contentlayer/**/**/*.mjs',
      '**/docs/content/.eslintrc.js',
      '**/coverage',
      'packages/types/src/**',
      '**/.cache',
      'public/**',
    ],
  },
]);
