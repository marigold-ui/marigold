import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Needed for MCP parser plugins that use ts-morph on the server
  serverExternalPackages: ['ts-morph', 'typescript'],
  async rewrites() {
    return [
      {
        source: '/docs/:path*.mdx',
        destination: '/llms.mdx/docs/:path*',
      },
      {
        source: '/mcp/:path*.mdx',
        destination: '/mcp/:path*',
      },
    ];
  },
};

export default withMDX(config);
