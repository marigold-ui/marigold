import { type CacheOptions, fetchWithCache } from './cache.js';
import { docsUrl } from './config.js';
import { sanitizeRemote } from './strip-ansi.js';

// Shape of the static index emitted by docs/scripts/build-manifest.mjs at
// public/component-search.json. `headings` lists every top-level `##` heading
// (scoring only); `sections` holds the prose-bearing sections shown as hits.
export interface SearchSection {
  heading: string;
  snippet: string;
}

export interface SearchComponent {
  slug: string;
  name: string | null;
  description: string | null;
  badge: string | null;
  headings: string[];
  sections: SearchSection[];
}

export interface SearchIndex {
  version?: string;
  generatedAt?: string;
  baseUrl: string;
  components: SearchComponent[];
}

export interface SearchHit {
  heading: string;
  snippet: string;
}

export interface SearchResult {
  slug: string;
  name: string;
  description: string | null;
  score: number;
  // The single best-matching section, emitted as evidence (capped at
  // MAX_HITS_PER_RESULT, currently 1). Scoring still reads every section (see
  // score), so this is a strict subset of what was matched.
  hits: SearchHit[];
}

export interface SearchOptions {
  limit?: number;
}

export const DEFAULT_SEARCH_LIMIT = 5;

// How many matched sections to emit as evidence per result. Scoring still reads
// every section (ranking is unaffected); this only trims the returned snippets
// so a default search stays within an agent's discovery token budget. The
// markdown/plain view shows the headline hit, so 1 keeps JSON consistent with it.
const MAX_HITS_PER_RESULT = 1;

// Scoring weights (DST-1446). Snippet weight is applied per matching section, so
// a query echoed across many sections ranks above an incidental mention.
const TITLE_WEIGHT = 3;
const DESCRIPTION_WEIGHT = 2;
const HEADING_WEIGHT = 2;
const SNIPPET_WEIGHT = 1;

// Sanitize a nullable string while preserving null (mirrors `clean` in
// manifest.ts).
const clean = (value: string | null): string | null =>
  value == null ? null : sanitizeRemote(value);

// Remote content reaches the terminal, so sanitize every string on load — the
// same defense manifest.ts applies, even though we author the index ourselves.
const cleanIndex = (raw: SearchIndex): SearchIndex => ({
  version: raw.version ? sanitizeRemote(raw.version) : undefined,
  generatedAt: raw.generatedAt ? sanitizeRemote(raw.generatedAt) : undefined,
  // baseUrl is printed to the terminal as a deep link, so sanitize it too.
  baseUrl: sanitizeRemote(raw.baseUrl),
  components: raw.components.map(c => ({
    slug: sanitizeRemote(c.slug),
    name: clean(c.name),
    description: clean(c.description),
    badge: clean(c.badge),
    headings: c.headings.map(sanitizeRemote),
    sections: c.sections.map(s => ({
      heading: sanitizeRemote(s.heading),
      snippet: sanitizeRemote(s.snippet),
    })),
  })),
});

export interface LoadSearchIndexResult {
  index: SearchIndex;
  cacheHit: boolean;
}

export const loadSearchIndex = async (
  options: CacheOptions = {}
): Promise<LoadSearchIndexResult> => {
  const url = `${docsUrl()}/component-search.json`;
  const { value, hit } = await fetchWithCache<SearchIndex>(
    url,
    text => cleanIndex(JSON.parse(text) as SearchIndex),
    options
  );
  return { index: value, cacheHit: hit };
};

// Split a query into lowercased, whitespace-delimited terms — prose matching is
// per-term substring, so we keep terms separate rather than collapsing them.
const tokenize = (query: string): string[] =>
  query.trim().toLowerCase().split(/\s+/).filter(Boolean);

// Count weighted substring hits for the terms against a single field.
const scoreField = (text: string, terms: string[], weight: number): number => {
  const haystack = text.toLowerCase();
  let score = 0;
  for (const term of terms) {
    if (haystack.includes(term)) score += weight;
  }
  return score;
};

interface ScoredSection {
  section: SearchSection;
  matches: number;
}

export const searchComponentDocs = (
  index: SearchIndex,
  query: string,
  options: SearchOptions = {}
): SearchResult[] => {
  const { limit = DEFAULT_SEARCH_LIMIT } = options;
  const terms = tokenize(query);
  if (terms.length === 0) return [];

  const results: SearchResult[] = [];
  for (const component of index.components) {
    let score = 0;
    const scoredSections: ScoredSection[] = [];

    if (component.name) {
      score += scoreField(component.name, terms, TITLE_WEIGHT);
    }
    if (component.description) {
      score += scoreField(component.description, terms, DESCRIPTION_WEIGHT);
    }
    // Each matching heading scores; the synthetic "Overview" label is absent
    // from `headings`, so it never inflates the ranking.
    for (const heading of component.headings) {
      score += scoreField(heading, terms, HEADING_WEIGHT);
    }

    for (const sec of component.sections) {
      const secScore = scoreField(sec.snippet, terms, SNIPPET_WEIGHT);
      if (secScore > 0) {
        score += secScore;
        scoredSections.push({ section: sec, matches: secScore });
      }
    }

    if (score <= 0) continue;

    // Most-relevant section first, then emit only the top few as evidence —
    // the full set was already used for scoring above.
    scoredSections.sort((a, b) => b.matches - a.matches);
    results.push({
      slug: component.slug,
      name: component.name ?? component.slug,
      description: component.description,
      score,
      hits: scoredSections.slice(0, MAX_HITS_PER_RESULT).map(s => ({
        heading: s.section.heading,
        snippet: s.section.snippet,
      })),
    });
  }

  results.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
  return results.slice(0, limit);
};
