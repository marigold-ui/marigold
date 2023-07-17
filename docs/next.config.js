const { withContentlayer } = require('next-contentlayer');

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
  transpilePackages: [
    '@marigold/components',
    '@marigold/theme-preset',
    '@marigold/system',
  ],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/introduction/getting-started',
        permanent: true,
      },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
