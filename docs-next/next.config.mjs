import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  optimizeFonts: true,
  compiler: {
    emotion: true,
  },
  typescript: {
    /** Do not run TypeScript during production builds (`next build`). */
    ignoreBuildErrors: isProduction,
    tsconfigPath: './tsconfig.json',
  },
  webpack: (config, { defaultLoaders: { babel } }) => {
    config.module.rules.push({
      include: [path.resolve(__dirname, '..')],
      test: /\.(js|jsx|ts|tsx)$/,
      use: [babel],
    });

    config.resolve.alias.root = path.resolve(__dirname, '..');

    return config;
  },
};

export default config;

// const path = require('path');
// const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

// const TS_CONFIG_PATH = path.resolve(__dirname, '..', 'tsconfig.json');

// exports.onCreateWebpackConfig = ({ stage, actions }) => {
//   actions.setWebpackConfig({
//     resolve: {
//       // Resolve modules to TS source rather than builds
//       plugins: [new TsconfigPathsPlugin({ configFile: TS_CONFIG_PATH })],
//     },
//   });
// };
