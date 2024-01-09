import type { StorybookConfig } from '@storybook/react-vite';
import path from 'node:path';
import { mergeConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';

const projectRoot = path.resolve(__dirname, '../../../');

const config: StorybookConfig = {
  stories: [
    path.resolve(projectRoot, 'packages/components/src/**/*.stories.tsx'),
    path.resolve(projectRoot, 'packages/system/src/**/*.stories.tsx'),
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    check: false,
  },
  features: {
    storyStoreV7: false,
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
