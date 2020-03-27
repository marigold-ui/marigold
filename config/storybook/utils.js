const findUp = require('find-up').sync;
const path = require('path');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');

const getProjectRoot = ({ cwd }) =>
  path.dirname(findUp('package.json', { cwd }));
const getTypescriptConfig = ({ cwd }) => findUp('tsconfig.json', { cwd });

// Custom Webpack Configs
// ---------------

/**
 * WHY WE DO NOT USE `@storybook/preset-typescript`?
 *
 * As time of writing (March 2020) the support for monorepos and
 * path aliases is no given, which makes working wit the preset
 * in combination with other addons very hard.
 */
const configureTypeScript = ({ config, cwd }) => {
  const configFile = getTypescriptConfig({ cwd });

  /**
   * Remove rules that use babel, this conflicts somehow with
   * the typescript configraution ¯\_(ツ)_/¯
   */
  config.module.rules = config.module.rules.filter(
    rule =>
      !(
        rule.use &&
        rule.use.length &&
        rule.use.find(({ loader }) => loader === 'babel-loader')
      )
  );

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: 'ts-loader',
    options: {
      transpileOnly: true,
      configFile,
    },
  });
  config.resolve.extensions.push('.ts', '.tsx');

  // TODO: currently we remove emotion path mapping :(
  config.resolve.plugins = [new TsconfigPathsPlugin({ configFile })];

  return config;
};

const configureMdxDocs = config => {
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
  config.resolve.extensions.push('.mdx');

  return config;
};

module.exports = {
  getProjectRoot,
  getTypescriptConfig,
  configureTypeScript,
  configureMdxDocs,
};
