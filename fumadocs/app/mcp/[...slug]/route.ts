import { source } from '@/lib/source';
import fs from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';

const OUTPUT_DIR = path.resolve(process.cwd(), 'app/mcp/out');

/**
 * Serve pre-built markdown files generated at build time.
 * Use: pnpm run build:md-docs before next build
 */
export const dynamic = 'force-static';

export const generateStaticParams = async () => {
  const params = await source.generateParams();

  return params.filter(
    param => Array.isArray(param.slug) && param.slug.length > 0
  );
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const slugPath = slug.join('/');

  // Map slug to pre-built markdown filename (e.g., "components-button" -> "components-button.md")
  const filename = slugPath.replace(/\//g, '-') + '.md';
  const filePath = path.join(OUTPUT_DIR, filename);

  try {
    const markdown = await fs.readFile(filePath, 'utf-8');
    return new Response(markdown, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Page not found' }, { status: 404 });
  }
}
