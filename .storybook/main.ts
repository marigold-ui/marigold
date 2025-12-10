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

const projectRoot = path.resolve(__dirname, './../../');

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
  // needed because without package have incorrect exports...
  async viteFinal(config) {
    return mergeConfig(config, {
      root: __dirname,
      plugins: [
        viteTsConfigPaths({
          root: projectRoot,
        }),
      ],
    });
  },
  staticDirs: ['./assets'],
});

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
