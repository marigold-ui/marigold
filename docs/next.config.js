/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@marigold/components',
    '@marigold/theme-preset',
    '@marigold/system',
  ],
};

module.exports = nextConfig;
