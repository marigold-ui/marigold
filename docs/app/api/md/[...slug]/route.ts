import { parseMdxToMarkdown } from '@/lib/markdown/parser';
import path from 'node:path';

const CONTENT_DIR = path.resolve(process.cwd(), 'content');

// `force-static` trips a Node 22+ undici/Next proxy bug
// ("Cannot read private member #state", undici#4290) during prerender.
// Run on demand and let the CDN cache via the long-lived Cache-Control
// header below — same effective behavior as static export.
export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  // Remove .md extension from URL slug if present
  const slugPath = slug.join('/').replace(/\.md$/, '');

  const candidates = [
    `${slugPath}.mdx`,
    `${slugPath}/${slug.at(-1)?.replace(/\.md$/, '')}.mdx`,
    `${slugPath}/index.mdx`,
  ];

  for (const candidate of candidates) {
    try {
      const result = await parseMdxToMarkdown({
        filePath: candidate,
        contentDir: CONTENT_DIR,
      });

      return new Response(result.markdown, {
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    } catch {
      continue;
    }
  }

  return new Response(JSON.stringify({ error: 'Page not found' }), {
    status: 404,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
