import { source } from '@/lib/source';
import type { SortedResult } from 'fumadocs-core/search';
import { createFromSource } from 'fumadocs-core/search/server';
import type { NextRequest } from 'next/server';

const searchAPI = createFromSource(source, {
  // https://docs.orama.com/docs/orama-js/supported-languages
  language: 'english',
});

/**
 * Group flat search results by page, then re-sort groups so that
 * pages whose title closely matches the query appear first.
 */
function sortResultGroups(
  results: SortedResult[],
  query: string
): SortedResult[] {
  // Split flat results into groups (each starting with a page-type entry)
  const groups: SortedResult[][] = [];
  for (const result of results) {
    if (result.type === 'page') {
      groups.push([result]);
    } else if (groups.length > 0) {
      groups[groups.length - 1].push(result);
    }
  }

  const q = query.toLowerCase().trim();

  // Score each group: lower = better (sorted ascending)
  const scored = groups.map(group => {
    const page = group[0];
    const title = page.content
      .replaceAll('<mark>', '')
      .replaceAll('</mark>', '')
      .toLowerCase()
      .trim();

    let score: number;
    if (title === q) {
      // Exact title match
      score = 0;
    } else if (title.startsWith(q) || title.endsWith(q)) {
      // Title starts/ends with query
      score = 1;
    } else if (title.includes(q)) {
      // Title contains query as substring
      score = 2;
    } else {
      // Query only found in sub-results (headings/text), keep original order
      score = 3;
    }

    return { group, score };
  });

  // Stable sort: within the same score tier, preserve original Orama ranking
  scored.sort((a, b) => a.score - b.score);

  return scored.flatMap(s => s.group);
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get('query') ?? '';
  const tag = searchParams.get('tag') ?? undefined;
  const locale = searchParams.get('locale') ?? undefined;

  const results = await searchAPI.search(query, { tag, locale });
  const sorted = sortResultGroups(results, query);

  return Response.json(sorted);
}
