import { source } from '@/lib/source';

// `force-static` trips a Node 22+ undici/Next proxy bug
// ("Cannot read private member #state", undici#4290) during prerender.
// Run on demand and let the CDN cache via the long-lived Cache-Control
// header below — same effective behavior as static export.
export const dynamic = 'force-dynamic';

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

  const body = JSON.stringify({
    baseUrl: 'https://www.marigold-ui.io',
    pages: entries,
  });

  return new Response(body, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
