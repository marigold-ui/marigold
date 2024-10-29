const { withContentlayer } = require('next-contentlayer2');
const pkg = require('./package.json');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  distDir: '.next',
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: [
    '@marigold/components',
    '@marigold/system',
    '@marigold/theme-preset',
  ],
  env: {
    version: pkg.version,
  },
  async redirects() {
    return [
      {
        source: '/getting-started',
        destination: '/getting-started/overview',
        permanent: true,
      },
      {
        source: '/foundations',
        destination: '/foundations/overview',
        permanent: true,
      },
      {
        source: '/components',
        destination: '/components/overview',
        permanent: true,
      },
      {
        source: '/patterns',
        destination: '/patterns/overview',
        permanent: true,
      },
      {
        source: '/recipes',
        destination: '/recipes/overview',
        permanent: true,
      },
      {
        source: '/resources',
        destination: '/resources/overview',
        permanent: true,
      },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
