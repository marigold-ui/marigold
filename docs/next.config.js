/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = nextConfig;
