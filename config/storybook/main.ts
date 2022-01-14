import type { StorybookConfig } from '@storybook/react/types';
import { sync as findUpSync } from 'find-up';
import path from 'node:path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const root = path.dirname(findUpSync('package.json') || '.');
const configFile = findUpSync('tsconfig.json', { cwd: root });

const config: StorybookConfig = {
  stories: [path.resolve(root, '**/*.stories.tsx')],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        docs: false,
      },
    },
    '@storybook/addon-a11y',
  ],
  typescript: {
    check: false,
    checkOptions: {},
  },
  features: {
    postcss: false,
  },
  framework: '@storybook/react',
  webpackFinal: async config => {
    // Add support for TS path mapping
    config.resolve!.plugins = [new TsconfigPathsPlugin({ configFile })];
    return config;
  },
  staticDirs: [{ from: './assets', to: '/assets' }],
};

module.exports = config;
