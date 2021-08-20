const findUp = require('find-up').sync;
const path = require('path');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

// Config Folders + Files
// ---------------
const root = path.dirname(findUp('package.json'));
const configFile = findUp('tsconfig.json', { cwd: root });

// Storybook Config
// ---------------
module.exports = {
  stories: [path.resolve(root, 'packages/**/*.stories.mdx')],
  addons: [
    '@storybook/react',
    '@storybook/addon-a11y',
    '@storybook/addon-controls',
    '@storybook/addon-docs',
    '@storybook/addon-essentials',
    'storybook-addon-themes',
  ],
  typescript: {
    reactDocgen: 'none',
  },
  webpackFinal: async config => {
    // Add support for TS path mapping
    config.resolve.plugins = [new TsconfigPathsPlugin({ configFile })];
    return config;
  },
};
