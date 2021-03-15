const path = require('path');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

const TS_CONFIG_PATH = path.resolve(__dirname, '..', 'tsconfig.json');

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      // Resolve modules to TS source rather than builds
      plugins: [new TsconfigPathsPlugin({ configFile: TS_CONFIG_PATH })],
    },
  });
};
