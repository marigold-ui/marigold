import { type CacheOptions, FetchError, fetchWithCache } from './cache.js';
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

// A component matching only one of several query terms is likely incidental, so
// its raw score is scaled by how much of the query it covers: a full-coverage
// match keeps its weight, a 1-of-N match keeps COVERAGE_FLOOR of it. Single-term
// queries always have coverage 1, so this is a no-op for them.
const COVERAGE_FLOOR = 0.5;

// Additive bonus when the full multi-word query appears verbatim in any field —
// an exact phrase is strong intent that scattered term matches shouldn't outrank.
const PHRASE_BONUS = 4;

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
    // `?? []` so a partially-written or malformed index degrades to an
    // empty field rather than throwing a cryptic "cannot read map of undefined".
    headings: (c.headings ?? []).map(sanitizeRemote),
    sections: (c.sections ?? []).map(s => ({
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
  try {
    const { value, hit } = await fetchWithCache<SearchIndex>(
      url,
      text => cleanIndex(JSON.parse(text) as SearchIndex),
      options
    );
    return { index: value, cacheHit: hit };
  } catch (err) {
    // The index ships with the docs build, so a 404 means the docs deployment
    // predates `marigold search`. Translate the raw HTTP error into guidance
    // rather than surfacing a bare "Failed to fetch … 404 Not Found".
    if (err instanceof FetchError && err.status === 404) {
      throw new Error(
        `Search index not found at ${url}. The docs site may predate ` +
          '`marigold search` — update the docs deployment, or point ' +
          'MARIGOLD_DOCS_URL at a build that includes it.',
        { cause: err }
      );
    }
    throw err;
  }
};

// Plural fold so "buttons" matches "Button": a conservative single-trailing-"s"
// trim, only on tokens long enough that the final letter is unlikely to matter.
const stem = (token: string): string =>
  token.length > 3 && token.endsWith('s') ? token.slice(0, -1) : token;

// Plural-folded, de-duplicated query words from an already-normalized (trimmed,
// lowercased) query. Whitespace-delimited — users type words, so the query
// itself is not camelCase-split.
const queryTerms = (normalized: string): string[] => [
  ...new Set(normalized.split(/\s+/).filter(Boolean).map(stem)),
];

// Word-aware token set for a field. Matching is per-whole-word rather than
// substring, so `form` no longer matches `Format`. camelCase boundaries
// (a lower/digit followed by an upper) are also emitted as parts — "TagField"
// yields {tagfield, tag, field} — so a `field` query still hits a component
// title or an inline `<TextField>` mention.
// Every token is plural-folded to line up with queryTerms().
const WORD = /[a-z0-9]+/gi;
const tokenizeField = (text: string): Set<string> => {
  const tokens = new Set<string>();
  for (const word of text.match(WORD) ?? []) {
    tokens.add(stem(word.toLowerCase()));
    const parts = word.replace(/([a-z0-9])([A-Z])/g, '$1 $2').split(/\s+/);
    if (parts.length > 1) {
      for (const part of parts) tokens.add(stem(part.toLowerCase()));
    }
  }
  return tokens;
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
  // Normalize once; both the term split and the phrase check derive from it.
  const normalized = query.trim().toLowerCase();
  const terms = queryTerms(normalized);
  if (terms.length === 0) return [];
  // Only multi-word queries earn a phrase bonus; a single term is already
  // covered by the token match below.
  const phrase = terms.length > 1 ? normalized.replace(/\s+/g, ' ') : null;

  const results: SearchResult[] = [];
  for (const component of index.components) {
    const matched = new Set<string>();
    const haystacks: string[] = [];
    let score = 0;
    const scoredSections: ScoredSection[] = [];

    // Score one field: add `weight` per distinct query term whose whole word
    // appears in it, recording which terms matched (for coverage) and the raw
    // text (for the phrase check).
    const accrue = (text: string | null, weight: number): number => {
      if (!text) return 0;
      haystacks.push(text);
      const tokens = tokenizeField(text);
      let s = 0;
      for (const term of terms) {
        if (tokens.has(term)) {
          s += weight;
          matched.add(term);
        }
      }
      return s;
    };

    score += accrue(component.name, TITLE_WEIGHT);
    score += accrue(component.description, DESCRIPTION_WEIGHT);
    // Each matching heading scores; the synthetic "Overview" label is absent
    // from `headings`, so it never inflates the ranking.
    for (const heading of component.headings) {
      score += accrue(heading, HEADING_WEIGHT);
    }

    for (const sec of component.sections) {
      const secScore = accrue(sec.snippet, SNIPPET_WEIGHT);
      if (secScore > 0) {
        score += secScore;
        scoredSections.push({ section: sec, matches: secScore });
      }
    }

    if (score <= 0) continue;

    // Scale by query coverage, then reward an exact-phrase hit. Round so the
    // emitted score stays a tidy relative number rather than a long float.
    score *=
      COVERAGE_FLOOR + (1 - COVERAGE_FLOOR) * (matched.size / terms.length);
    // Join on a newline (not a space) so a phrase can't straddle two fields —
    // e.g. a name ending "date" and a snippet starting "picker…" must not
    // synthesize a spurious "date picker" match.
    if (phrase && haystacks.join('\n').toLowerCase().includes(phrase)) {
      score += PHRASE_BONUS;
    }
    score = Math.round(score * 100) / 100;

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
