import { parseMdxToMarkdown } from '@/lib/markdown/parser';
import { source } from '@/lib/source';
import path from 'node:path';
import { NextResponse } from 'next/server';

const CONTENT_DIR = path.resolve(process.cwd(), 'content');

/**
 * Parse MDX to markdown at build time (SSG).
 * ComponentDemo sources come from .registry/demos.json (pure data, no Client imports).
 */
export const dynamic = 'force-static';

export const generateStaticParams = async () => {
  const params = await source.generateParams();

  return params
    .filter(param => Array.isArray(param.slug) && param.slug.length > 0)
    .map(param => ({
      slug: [...param.slug.slice(0, -1), `${param.slug.at(-1)}.md`],
    }));
};

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

  return NextResponse.json({ error: 'Page not found' }, { status: 404 });
}
