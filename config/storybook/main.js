const path = require('path');
const {
  getProjectRoot,
  configureTypeScript,
  configureMdxDocs,
} = require('./utils');

const root = getProjectRoot({ cwd: process.cwd() });

// Webpack
// ---------------
const webpackFinal = async config => {
  // Note: We need to configure TS first, otherwise werid things happen ...
  config = configureTypeScript({ config, cwd: root });
  config = configureMdxDocs(config);
  return config;
};

// Storybook Config
// ---------------
module.exports = {
  stories: [path.resolve(root, 'packages/**/*.stories.mdx')],
  addons: [
    '@storybook/react',
    //TODO: Make this work again
    // '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  webpackFinal,
};
