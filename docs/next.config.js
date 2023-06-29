const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  distDir: '../.next',
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: [
    '@marigold/components',
    '@marigold/theme-preset',
    '@marigold/system',
  ],
};

module.exports = withContentlayer(nextConfig);
