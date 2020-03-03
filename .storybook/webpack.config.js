module.exports = ({ config }) => {
    /**
     * Using `storybook` with a monorepo seems to be 🤢.
     * We fixed it by using the following suggestion:
     * https://github.com/storybooks/storybook/issues/3346#issuecomment-467237732
     */
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
    config.resolve.extensions.push('.ts', '.tsx');
  
    return config;
  };
  