import type { StorybookConfig } from '@storybook/react/types';

const config: StorybookConfig = {
  // TODO: add correct path :D
  stories: ['./debug.stories.tsx'],
  logLevel: 'debug',
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
};

module.exports = config;
