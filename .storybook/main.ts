import { defineMain } from '@storybook/react-vite/node';
import { dirname, join } from 'path';
import { mergeConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

export default defineMain({
  stories: [
    '../packages/components/src/**/*.stories.tsx',
    '../packages/system/src/**/*.stories.tsx',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    'storybook-addon-test-codegen',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    check: false,
  },
  features: {
    experimentalTestSyntax: true,
  },
  staticDirs: ['./assets'],
});
