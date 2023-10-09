const { withContentlayer } = require('next-contentlayer');
const pkg = require('./package.json');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  distDir: '../.next',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    path: './',
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
        source: '/',
        destination: '/introduction/getting-started',
        permanent: true,
      },
      {
        source: '/components',
        destination: '/components/provider',
        permanent: true,
      },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
