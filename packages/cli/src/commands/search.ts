import { type OutputFormat, formatSearchResults } from '../lib/format.js';
import { loadSearchIndex, searchComponentDocs } from '../lib/search.js';
import {
  type VersionWarning,
  loadVersionWarning,
} from '../lib/version-warning.js';

export interface RunSearchOptions {
  query: string;
  limit?: number;
  format?: OutputFormat;
  fresh?: boolean;
  offline?: boolean;
  /** Where to look for the installed `@marigold/components`. */
  cwd?: string;
}

export interface RunSearchResult {
  output: string;
  cacheHit: boolean;
  // Set when the installed `@marigold/components` is older than the docs.
  // Never part of `output`: the JSON there is a documented bare array.
  warning: VersionWarning | null;
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

  const warning = await loadVersionWarning({
    cwd: options.cwd,
    offline: options.offline,
  });

  return { output, cacheHit, warning };
};
