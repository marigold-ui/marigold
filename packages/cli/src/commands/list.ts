import {
  type OutputFormat,
  formatList,
  matchesCategory,
} from '../lib/format.js';
import { type Manifest, loadManifest } from '../lib/manifest.js';

export interface RunListOptions {
  category?: string;
  search?: string;
  format?: OutputFormat;
  fresh?: boolean;
  offline?: boolean;
}

export interface RunListResult {
  output: string;
  cacheHit: boolean;
  // The manifest's spelling of `category`, or undefined when none was given or
  // it matched nothing.
  category?: string;
}

// Component categories and page groups alike, as formatList filters them.
const resolveCategory = (
  manifest: Manifest,
  input: string
): string | undefined =>
  [
    ...manifest.categories.map(c => c.name),
    ...manifest.pages.map(p => p.category),
  ].find(name => matchesCategory(name, input));

export const runList = async (
  options: RunListOptions = {}
): Promise<RunListResult> => {
  const { manifest, cacheHit } = await loadManifest({
    fresh: options.fresh,
    offline: options.offline,
  });

  const output = formatList(
    manifest,
    { category: options.category, search: options.search },
    options.format ?? 'markdown'
  );

  const category = options.category
    ? resolveCategory(manifest, options.category)
    : undefined;

  return { output, cacheHit, category };
};
