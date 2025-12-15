import { createMDX } from 'fumadocs-mdx/next';

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
      // {
      //   source: '/releases',
      //   destination: '/releases/overview',
      //   permanent: true,
      // },
      {
        source: '/patterns',
        destination: '/patterns/overview',
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
