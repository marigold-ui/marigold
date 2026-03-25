import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Needed for MCP parser plugins that use ts-morph on the server
  serverExternalPackages: ['ts-morph', 'typescript'],
  // Ensure chunks_search.json is bundled with the /mcp serverless function on Vercel
  outputFileTracingIncludes: {
    '/mcp': ['./app/mcp/chunks_search.json'],
  },
  async redirects() {
    return [
      {
        source: '/mcp/:path((?!.*\\.md$).*)',
        destination: '/mcp/:path.md',
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/docs/:path*.mdx',
        destination: '/llms.mdx/docs/:path*',
      },
    ];
  },
};

export default withMDX(config);
