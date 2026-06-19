import { type OutputFormat, formatSearchResults } from '../lib/format.js';
import { loadSearchIndex, searchComponentDocs } from '../lib/search.js';

export interface RunSearchOptions {
  query: string;
  limit?: number;
  format?: OutputFormat;
  fresh?: boolean;
  offline?: boolean;
}

export interface RunSearchResult {
  output: string;
  cacheHit: boolean;
}

export const runSearch = async (
  options: RunSearchOptions
): Promise<RunSearchResult> => {
  if (!options.query) {
    throw new Error('Usage: marigold search <query>');
  }

  const { index, cacheHit } = await loadSearchIndex({
    fresh: options.fresh,
    offline: options.offline,
  });

  const results = searchComponentDocs(index, options.query, {
    limit: options.limit,
  });

  const output = formatSearchResults(
    results,
    options.query,
    index.baseUrl,
    options.format ?? 'markdown'
  );

  return { output, cacheHit };
};
