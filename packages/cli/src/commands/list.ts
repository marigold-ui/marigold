import { type OutputFormat, formatList } from '../lib/format.js';
import { loadManifest } from '../lib/manifest.js';

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
}

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

  return { output, cacheHit };
};
