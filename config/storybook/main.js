const findUp = require('find-up').sync;
const path = require('path');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

const root = path.dirname(findUp('package.json'));
const tsconfig = findUp('tsconfig.json', { cwd: root });

module.exports = {
  stories: [path.resolve(root, 'packages/**/*.stories.mdx')],
  addons: [
    '@storybook/react',
    '@storybook/addon-a11y',
    {
      name: '@storybook/preset-typescript',
      options: {
        tsLoaderOptions: {
          configFile: tsconfig,
        },
      },
    },
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
      },
    },
  ],
  webpackFinal: async config => {
    config.resolve.plugins = [
      new TsconfigPathsPlugin({ configFile: tsconfig }),
    ];

    return config;
  },
};
