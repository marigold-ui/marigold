const findUp = require('find-up');
const path = require('path');

//tsconfig paths package!
const PROJECT_ROOT = findUp.sync('package.json'); // TODO: only directory
const TS_CONFIG_PATH = findUp.sync('tsconfig.json'); // Start from project root

// resolve tsconfig path aliases

module.exports = {
  stories: [path.resolve(PROJECT_ROOT, 'packages/**/*.stories.mdx')],
  addons: [
    '@storybook/react',
    '@storybook/addon-a11y',
    {
      name: '@storybook/preset-typescript',
      options: {
        tsLoaderOptions: {
          configFile: TS_CONFIG_PATH,
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
};
