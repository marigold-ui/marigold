import { defineMain } from '@storybook/react-vite/node';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export default defineMain({
  stories: [
    '../packages/components/src/**/*.stories.tsx',
    '../packages/system/src/**/*.stories.tsx',
  ],
  addons: [
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('storybook-addon-test-codegen'),
    getAbsolutePath('@storybook/addon-vitest'),
    getAbsolutePath('@storybook/addon-mcp'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  typescript: {
    check: false,
  },
  features: {
    experimentalTestSyntax: true,
  },
  staticDirs: ['./assets'],
  viteFinal: config => {
    config.optimizeDeps ??= {};
    config.optimizeDeps.include ??= [];
    config.optimizeDeps.include.push('@storybook/react-dom-shim');
    return config;
  },
});

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
