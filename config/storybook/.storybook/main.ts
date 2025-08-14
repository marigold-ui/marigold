import type { StorybookConfig } from '@storybook/react-vite';
import { dirname, join } from 'path';
import path from 'path';
import { mergeConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';

const projectRoot = path.resolve(__dirname, '../../../');

const config: StorybookConfig = {
  stories: [
    path.resolve(projectRoot, 'packages/components/src/**/*.stories.tsx'),
    path.resolve(projectRoot, 'packages/system/src/**/*.stories.tsx'),
  ],
  addons: [
    {
      name: '@storybook/addon-coverage',
      options: {
        istanbul: {
          cwd: projectRoot,
          include: ['packages/components/src/**', 'packages/system/src/**'],
          exclude: [
            '**/*.stories.*',
            '**/*.test.*',
            '**/node_modules/**',
            '**/.storybook/**',
            '**/coverage/**',
            '**/dist/**',
          ],
        },
      },
    },
    getAbsolutePath('@storybook/addon-themes'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs'),
    'storybook-addon-test-codegen',
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
      use: [
        {
          loader: require.resolve('@storybook/source-loader'),
          options: {} /* your sourceLoaderOptions here */,
        },
      ],
    });
  },
  staticDirs: ['./assets'],
};
export default config;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
