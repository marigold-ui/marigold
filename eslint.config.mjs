import { defineConfig } from 'eslint/config';
import marigoldBaseConfig from '@marigold/eslint-config';

export default defineConfig([
  marigoldBaseConfig,

  {
    ignores: [
      '**/dist',
      '**/.next',
      '**/out',
      '**/storybook-static',
      '**/docs/.contentlayer/**/**/*.mjs',
      '**/coverage',
    ],
  },
]);
