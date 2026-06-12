import { type CacheOptions, fetchWithCache, readCacheSync } from './cache.js';
import { docsUrl } from './config.js';
import { normalize, suggestByScore } from './manifest.js';
import { sanitizeRemote } from './strip-ansi.js';

// Lightweight manifest entry, served from /mcp/examples.json. Mirrors the
// payload emitted by docs/scripts/build-examples.mjs.
export interface ExampleSummary {
  slug: string;
  title: string;
  brief: string;
  patterns: string[];
}

export interface ExamplesManifest {
  version?: string;
  generatedAt?: string;
  baseUrl: string;
  examples: ExampleSummary[];
}

export interface ExampleMockData {
  alias: string;
  shape: string;
}

export interface ExampleFile {
  path: string;
  source: string;
}

// Full per-example payload, served from /mcp/examples/<slug>.json.
export interface ExampleDetail extends ExampleSummary {
  mockData: ExampleMockData[];
  keyFiles: string[];
  scaffoldingFiles: string[];
  peerDeps: string[];
  files: ExampleFile[];
  url: string;
}

// Sanitize at the boundary: although the example source is our own code, it is
// fetched as remote content and printed to the terminal, so we strip any
// terminal escape sequences just like the docs path does.
const cleanSummary = (raw: ExampleSummary): ExampleSummary => ({
  slug: sanitizeRemote(raw.slug),
  title: sanitizeRemote(raw.title),
  brief: sanitizeRemote(raw.brief),
  patterns: (raw.patterns ?? []).map(sanitizeRemote),
});

const parseManifest = (text: string): ExamplesManifest => {
  const raw = JSON.parse(text) as ExamplesManifest;
  return {
    version: raw.version ? sanitizeRemote(raw.version) : undefined,
    generatedAt: raw.generatedAt,
    baseUrl: raw.baseUrl,
    examples: (raw.examples ?? []).map(cleanSummary),
  };
};

export interface LoadExamplesResult {
  manifest: ExamplesManifest;
  cacheHit: boolean;
}

export const loadExamplesManifest = async (
  options: CacheOptions = {}
): Promise<LoadExamplesResult> => {
  const url = `${docsUrl()}/mcp/examples.json`;
  const { value, hit } = await fetchWithCache<ExamplesManifest>(
    url,
    parseManifest,
    options
  );
  return { manifest: value, cacheHit: hit };
};

export const listExamples = async (
  options: CacheOptions = {}
): Promise<{ examples: ExampleSummary[]; cacheHit: boolean }> => {
  const { manifest, cacheHit } = await loadExamplesManifest(options);
  return { examples: manifest.examples, cacheHit };
};

// Synchronous, never-throws cache-only loader. Used by tab completion where
// network I/O is unacceptable. Returns null on missing or malformed cache.
export const loadExamplesManifestSync = (): ExamplesManifest | null => {
  try {
    const text = readCacheSync(`${docsUrl()}/mcp/examples.json`);
    if (text === null) return null;
    return parseManifest(text);
  } catch {
    return null;
  }
};

// Resolve a positional query to a known example, using the same match cascade
// as the component/page resolvers: exact slug or title, case-insensitive title,
// then normalized (kebab/space/underscore-insensitive) title.
export const resolveExample = (
  manifest: ExamplesManifest,
  input: string
): ExampleSummary | null => {
  const needle = normalize(input);
  const examples = manifest.examples;

  const exact = examples.find(e => e.slug === input || e.title === input);
  if (exact) return exact;

  const ci = examples.find(e => e.title.toLowerCase() === input.toLowerCase());
  if (ci) return ci;

  const norm = examples.find(
    e => normalize(e.slug) === needle || normalize(e.title) === needle
  );
  if (norm) return norm;

  return null;
};

export const suggestExamples = (
  manifest: ExamplesManifest,
  input: string,
  limit = 3
): ExampleSummary[] =>
  suggestByScore(
    manifest.examples,
    e => normalize(`${e.slug} ${e.title}`),
    input,
    limit
  );

const parseDetail = (text: string): Omit<ExampleDetail, 'url'> => {
  const raw = JSON.parse(text) as ExampleDetail;
  return {
    ...cleanSummary(raw),
    mockData: (raw.mockData ?? []).map(m => ({
      alias: sanitizeRemote(m.alias),
      shape: sanitizeRemote(m.shape),
    })),
    keyFiles: (raw.keyFiles ?? []).map(sanitizeRemote),
    scaffoldingFiles: (raw.scaffoldingFiles ?? []).map(sanitizeRemote),
    peerDeps: (raw.peerDeps ?? []).map(sanitizeRemote),
    files: (raw.files ?? []).map(f => ({
      path: sanitizeRemote(f.path),
      source: sanitizeRemote(f.source),
    })),
  };
};

export const getExample = async (
  input: string,
  options: CacheOptions = {}
): Promise<{ example: ExampleDetail; cacheHit: boolean }> => {
  const { manifest } = await loadExamplesManifest(options);
  const resolved = resolveExample(manifest, input);

  if (!resolved) {
    const suggestions = suggestExamples(manifest, input).map(e => e.slug);
    const hint = suggestions.length
      ? ` Did you mean: ${suggestions.join(', ')}?`
      : ` Run "marigold examples list" to see available examples.`;
    throw new Error(`No example "${input}" found.${hint}`);
  }

  const url = `${docsUrl()}/mcp/examples/${resolved.slug}.json`;
  const { value, hit } = await fetchWithCache(url, parseDetail, options);

  return { example: { ...value, url }, cacheHit: hit };
};
