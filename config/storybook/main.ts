import type { StorybookConfig } from '@storybook/react/types';
import path from 'node:path';
import { sync as findUpSync } from 'find-up';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const parent = path.resolve(__dirname, '..');
const root = path.dirname(findUpSync('package.json', { cwd: parent }) || '.');
const configFile = findUpSync('tsconfig.json', { cwd: root });

const config: StorybookConfig = {
  stories: [path.resolve(root, '**/*.stories.tsx')],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
        docs: false,
      },
    },
    'storybook-addon-themes',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  typescript: {
    check: false,
    checkOptions: {},
  },
  features: {
    postcss: false,
    interactionsDebugger: true,
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
