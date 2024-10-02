const { withContentlayer } = require('next-contentlayer2');
const pkg = require('./package.json');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  distDir: '.next',
  typescript: {
    ignoreBuildErrors: true,
  },
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
        source: '/',
        destination: '/getting-started/overview',
        permanent: true,
      },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
