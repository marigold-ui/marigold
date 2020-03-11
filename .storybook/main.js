const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');
const WORKSPACE_ROOT = '../packages';

module.exports = {
  stories: [`${WORKSPACE_ROOT}/**/stories.mdx`],
  addons: [
    '@storybook/react',
    '@storybook/addon-docs/register',
    '@storybook/addon-a11y',
  ],
  webpackFinal: async config => {
    config.module.rules = config.module.rules.filter(
      rule =>
        !(
          rule.use &&
          rule.use.length &&
          rule.use.find(({ loader }) => loader === 'babel-loader')
        )
    );

    // Use babel to transpile TypeScript.
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['react-app', { flow: false, typescript: true }]],
      },
    });
    config.resolve.extensions.push('.ts', '.tsx', '.mdx');

    config.module.rules.push({
      test: /(stories|story)\.mdx$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-transform-react-jsx'],
          },
        },
        {
          loader: '@mdx-js/loader',
          options: {
            compilers: [createCompiler({})],
          },
        },
      ],
    });
    return config;
  },
};
