const WORKSPACE_ROOT = '../packages';

module.exports = {
  stories: [`${WORKSPACE_ROOT}/**/stories.(ts|tsx)`],
  addons: [
    '@storybook/react',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
  ],
};
