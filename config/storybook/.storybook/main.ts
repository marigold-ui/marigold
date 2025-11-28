// This file has been automatically migrated to valid ESM format by Storybook.
import type { StorybookConfig } from '@storybook/react-vite';
import { dirname, join } from 'path';
import { mergeConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

const projectRoot = path.resolve(__dirname, '../../../');

const config: StorybookConfig = {
  stories: [
    path.resolve(projectRoot, 'packages/components/src/**/*.stories.tsx'),
    path.resolve(projectRoot, 'packages/system/src/**/*.stories.tsx'),
  ],
  addons: [
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('storybook-addon-test-codegen'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  typescript: {
    check: false,
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
};
export default config;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
