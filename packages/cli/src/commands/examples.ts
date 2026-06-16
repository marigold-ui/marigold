import { getExample, listExamples } from '../lib/examples.js';
import {
  type OutputFormat,
  formatExample,
  formatExamplesList,
} from '../lib/format.js';

export type ExamplesSubcommand = 'list' | 'get';

export interface RunExamplesOptions {
  subcommand: ExamplesSubcommand;
  slug?: string;
  format?: OutputFormat;
  fresh?: boolean;
  offline?: boolean;
}

export interface RunExamplesResult {
  output: string;
  cacheHit: boolean;
}

export const runExamples = async (
  options: RunExamplesOptions
): Promise<RunExamplesResult> => {
  const cacheOptions = { fresh: options.fresh, offline: options.offline };
  const format = options.format ?? 'markdown';

  if (options.subcommand === 'list') {
    const { examples, cacheHit } = await listExamples(cacheOptions);
    return { output: formatExamplesList(examples, format), cacheHit };
  }

  if (!options.slug) {
    throw new Error('Usage: marigold examples get <slug>');
  }

  const { example, cacheHit } = await getExample(options.slug, cacheOptions);
  return { output: formatExample(example, format), cacheHit };
};
