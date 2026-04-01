import { source } from '@/lib/source';
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

const EXCLUDED_PREFIXES = ['releases'];
const EXCLUDED_SEGMENTS = ['__internal__'];

export async function GET() {
  const pages = source.getPages();

  const entries = pages
    .filter(page => {
      if (page.slugs.length === 0) return false;
      if (EXCLUDED_PREFIXES.includes(page.slugs[0])) return false;
      if (page.slugs.some(s => EXCLUDED_SEGMENTS.includes(s))) return false;
      return true;
    })
    .map(page => {
      const slug = page.slugs.join('/');
      const categoryParts = page.slugs.slice(0, -1);
      return {
        name: page.data.title,
        slug,
        category: categoryParts.join('/') || page.slugs[0],
        description: page.data.description,
        badge: (page.data as unknown as { badge?: string }).badge ?? null,
        url: `/api/md/${slug}.md`,
      };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));

  return NextResponse.json({
    baseUrl: 'https://www.marigold-ui.io',
    pages: entries,
  });
}
