import { createMDX } from 'fumadocs-mdx/next';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: [
    '@marigold/components',
    '@marigold/system',
    '@marigold/theme-docs',
    '@marigold/theme-rui',
  ],
  env: {
    version: pkg.version,
  },

  productionBrowserSourceMaps: false,

  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },

  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error', 'warn'],
          }
        : false,
  },

  experimental: {
    optimizePackageImports: [
      '@marigold/components',
      '@marigold/icons',
      'fumadocs-ui',
      'lucide-react',
      'react-use',
      'react-hook-form',
      '@tanstack/react-query',
      '@react-aria/i18n',
    ],
  },

  async redirects() {
    return [
      {
        source: '/components',
        destination: '/components/overview',
        permanent: true,
      },
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
        source: '/releases',
        destination: '/releases/overview',
        permanent: true,
      },
      {
        source: '/patterns',
        destination: '/patterns/overview',
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
