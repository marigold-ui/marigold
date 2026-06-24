import { type Section, getPageDocs } from '../lib/docs.js';
import { type OutputFormat, formatDocs } from '../lib/format.js';

export interface RunDocsOptions {
  component: string;
  section?: Section;
  format?: OutputFormat;
  fresh?: boolean;
  offline?: boolean;
}

export interface RunDocsResult {
  output: string;
  cacheHit: boolean;
}

export const runDocs = async (
  options: RunDocsOptions
): Promise<RunDocsResult> => {
  if (!options.component) {
    throw new Error('Usage: marigold docs <name-or-slug>');
  }

  const docs = await getPageDocs(options.component, {
    section: options.section ?? 'all',
    fresh: options.fresh,
    offline: options.offline,
  });

  const output = formatDocs(docs, options.format ?? 'markdown');
  return { output, cacheHit: docs.cacheHit };
};
