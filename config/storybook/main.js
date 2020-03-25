module.exports = {
  stories: ['../packages/**/*.stories.mdx'],
  addons: [
    '@storybook/react',
    '@storybook/preset-typescript',
    '@storybook/addon-a11y',
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
