const path = require('path');
const WORKSPACE_ROOT = '../packages';

module.exports = {
  stories: [`${WORKSPACE_ROOT}/**/stories.(ts|tsx)`],
  addons: [
    '@storybook/react',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
    {
      name: '@storybook/preset-typescript',
      options: {
        include: [path.resolve(__dirname, WORKSPACE_ROOT)],
      },
    },
  ],
};
