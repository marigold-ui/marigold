const path = require('path');

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  webpack: (config, { defaultLoaders: { babel } }) => {
    config.module.rules.push({
      include: [path.resolve(__dirname, '../')],
      test: /\.(js|jsx|ts|tsx)$/,
      use: [babel],
    });

    config.resolve.alias.root = path.resolve(__dirname, '../');

    return config;
  },
};

module.exports = config;
