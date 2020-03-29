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
    {
      name: '@storybook/preset-typescript',
      options: {
        tsLoaderOptions: {
          configFile,
          transpileOnly: true,
        },
      },
    },
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  webpackFinal: async config => {
    // Add support for Typescript's path mappdings
    config.resolve.plugins = [new TsconfigPathsPlugin({ configFile })];
    return config;
  },
};
