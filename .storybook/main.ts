import { defineMain } from '@storybook/react-vite/node';

export default defineMain({
  stories: [
    '../packages/components/src/**/*.stories.tsx',
    '../packages/system/src/**/*.stories.tsx',
    '../themes/**/*.stories.tsx',
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
