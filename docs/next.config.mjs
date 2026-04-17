import { createMDX } from 'fumadocs-mdx/next';
import componentsPkg from '../packages/components/package.json' with { type: 'json' };

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  env: {
    version: componentsPkg.version,
  },
  reactStrictMode: true,
  // Needed for markdown parser plugins that use ts-morph on the server
  serverExternalPackages: ['ts-morph', 'typescript'],
  async rewrites() {
    return [
      {
        source: '/docs/:path*.mdx',
        destination: '/llms.mdx/docs/:path*',
      },
      {
        source: '/:path(.*)\\.md',
        destination: '/api/md/:path.md',
      },
    ];
  },
};

export default withMDX(config);
