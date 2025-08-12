import type { StorybookConfig } from '@storybook/react-vite';
import { dirname, join } from 'path';
import path from 'path';

const projectRoot = path.resolve(__dirname, '../../../');

const config: StorybookConfig = {
  stories: [
    '../../../packages/components/src/**/*.stories.tsx',
    '../../../packages/system/src/**/*.stories.tsx',
  ],
  addons: [
    {
      name: '@storybook/addon-coverage',
      options: {
        istanbul: {
          all: true,
          include: [
            'packages/components/src/**/*.{ts,tsx}',
            'packages/system/src/**/*.{ts,tsx}',
          ],
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
  viteFinal: async config => {
    // Configure environment for coverage
    config.define = {
      ...config.define,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'test'),
    };

    return config;
  },
  staticDirs: ['./assets'],
};
export default config;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
