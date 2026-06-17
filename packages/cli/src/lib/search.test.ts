import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { cachePathFor } from './cache.js';
import { docsUrl } from './config.js';
import {
  type SearchComponent,
  type SearchIndex,
  loadSearchIndex,
  searchComponentDocs,
} from './search.js';

const INDEX: SearchIndex = {
  baseUrl: 'https://www.marigold-ui.io',
  components: [
    {
      slug: 'components/form/textfield',
      name: 'TextField',
      description: 'Component for input forms.',
      badge: null,
      headings: ['Usage', 'Props'],
      sections: [
        {
          heading: 'Overview',
          snippet: 'The TextField lets users enter text.',
        },
        {
          heading: 'Usage',
          snippet: 'Use TextField for free-form input validation.',
        },
      ],
    },
    {
      slug: 'components/form/field-error',
      name: 'FieldError',
      description: 'Show a validation message.',
      badge: null,
      headings: ['Usage'],
      sections: [
        {
          heading: 'Overview',
          snippet: 'FieldError renders a validation message under a field.',
        },
        { heading: 'Usage', snippet: 'Use FieldError for field validation.' },
      ],
    },
    {
      slug: 'components/actions/button',
      name: 'Button',
      description: 'Trigger actions.',
      badge: null,
      headings: ['Usage'],
      sections: [
        { heading: 'Overview', snippet: 'Button triggers an action.' },
      ],
    },
  ],
};

describe('searchComponentDocs', () => {
  test('ranks by weighted score (description + multiple sections beat one section)', () => {
    const results = searchComponentDocs(INDEX, 'validation');

    // FieldError matches description (×2) + two section snippets (×1 each);
    // TextField matches only its Usage snippet (×1). Button has no match.
    expect(results.map(r => r.name)).toEqual(['FieldError', 'TextField']);
    expect(results[0].score).toBeGreaterThan(results[1].score);
    expect(results.find(r => r.name === 'Button')).toBeUndefined();
  });

  test('title match outweighs body-only matches', () => {
    const results = searchComponentDocs(INDEX, 'field validation');

    // Both names contain "field" (title ×3), but FieldError also matches
    // "validation" in description and both sections, so it ranks first.
    expect(results[0].name).toBe('FieldError');
    expect(results[1].name).toBe('TextField');
  });

  test('accumulates snippet score per matching section', () => {
    const results = searchComponentDocs(INDEX, 'validation');
    const fieldError = results.find(r => r.name === 'FieldError');

    // Scoring reads every section: description (2) + Overview snippet (1) +
    // Usage snippet (1) = 4 — even though only the top hit is emitted as evidence.
    expect(fieldError?.score).toBe(4);
    expect(fieldError?.hits).toHaveLength(1);
    expect(fieldError?.hits[0].heading).toBe('Overview');
  });

  test('emits only the top-matching section as evidence', () => {
    // TagField-style component matching in 3 sections still returns one hit.
    const results = searchComponentDocs(INDEX, 'validation');

    for (const r of results) {
      expect(r.hits.length).toBeLessThanOrEqual(1);
    }
  });

  test('breaks score ties alphabetically by name', () => {
    const tieIndex: SearchIndex = {
      baseUrl: 'https://www.marigold-ui.io',
      components: [
        {
          slug: 'components/x/zeta',
          name: 'Zeta',
          description: 'A shared keyword here.',
          badge: null,
          headings: [],
          sections: [],
        },
        {
          slug: 'components/x/alpha',
          name: 'Alpha',
          description: 'A shared keyword here.',
          badge: null,
          headings: [],
          sections: [],
        },
      ],
    };

    const results = searchComponentDocs(tieIndex, 'keyword');

    expect(results.map(r => r.name)).toEqual(['Alpha', 'Zeta']);
    expect(results[0].score).toBe(results[1].score);
  });

  test('respects --limit', () => {
    const results = searchComponentDocs(INDEX, 'validation', { limit: 1 });

    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('FieldError');
  });

  test('returns nothing for an empty query', () => {
    expect(searchComponentDocs(INDEX, '   ')).toEqual([]);
  });

  test('returns nothing when the index is empty', () => {
    const empty: SearchIndex = { baseUrl: 'x', components: [] };

    expect(searchComponentDocs(empty, 'validation')).toEqual([]);
  });

  // --- word-aware / camelCase / coverage / phrase tuning -------------------

  const names = (idx: SearchIndex, q: string) =>
    searchComponentDocs(idx, q).map(r => r.name);

  const make = (components: SearchIndex['components']): SearchIndex => ({
    baseUrl: 'x',
    components,
  });

  const empty: Omit<SearchComponent, 'slug' | 'name'> = {
    description: null,
    badge: null,
    headings: [],
    sections: [],
  };

  test('matches a camelCase title fragment (field → TagField/TextField)', () => {
    const idx = make([
      { ...empty, slug: 'components/form/tagfield', name: 'TagField' },
      { ...empty, slug: 'components/form/textfield', name: 'TextField' },
      { ...empty, slug: 'components/actions/button', name: 'Button' },
    ]);

    const result = names(idx, 'field');

    expect(result).toEqual(expect.arrayContaining(['TagField', 'TextField']));
    expect(result).not.toContain('Button');
  });

  test('whole-word matching: "form" does not match "Format"', () => {
    const idx = make([
      {
        ...empty,
        slug: 'components/x/dateformat',
        name: 'DateFormat',
        description: 'Format dates and times.',
      },
      {
        ...empty,
        slug: 'components/x/form',
        name: 'Form',
        description: 'A form wrapper.',
      },
    ]);

    // The classic substring false positive (form ∈ Format) is gone…
    expect(names(idx, 'form')).toEqual(['Form']);
    // …but "format" still finds the component that is actually about formatting.
    expect(names(idx, 'format')).toContain('DateFormat');
  });

  test('plural query matches the singular title (buttons → Button)', () => {
    const idx = make([
      { ...empty, slug: 'components/actions/button', name: 'Button' },
    ]);

    expect(names(idx, 'buttons')).toEqual(['Button']);
  });

  test('coverage scaling: a full-query match outranks a higher-weighted single-term match', () => {
    const idx = make([
      {
        ...empty,
        slug: 'components/x/both',
        name: 'Both',
        description: 'alpha beta together.',
      },
      {
        ...empty,
        slug: 'components/x/alpha',
        name: 'Alpha', // title weight 3 for the single term "alpha"
        description: 'only one term.',
      },
    ]);

    const results = searchComponentDocs(idx, 'alpha beta');

    expect(results.map(r => r.name)).toEqual(['Both', 'Alpha']);
    // Alpha matched only 1 of 2 terms, so its raw title score (3) is scaled by
    // the coverage floor: 3 * (0.5 + 0.5 * 0.5) = 2.25.
    const alpha = results.find(r => r.name === 'Alpha');
    expect(alpha?.score).toBeCloseTo(2.25);
  });

  test('phrase bonus: an exact adjacent phrase outranks the same terms scattered', () => {
    const idx = make([
      {
        ...empty,
        slug: 'components/x/adjacent',
        name: 'Adjacent',
        description: 'date picker selection.',
      },
      {
        ...empty,
        slug: 'components/x/scattered',
        name: 'Scattered',
        description: 'pick a date from the picker list.',
      },
    ]);

    const results = searchComponentDocs(idx, 'date picker');

    expect(results.map(r => r.name)).toEqual(['Adjacent', 'Scattered']);
    expect(results[0].score).toBeGreaterThan(results[1].score + 1);
  });
});

const seedCache = (url: string, body: string) => {
  const file = cachePathFor(url);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, body);
};

describe('loadSearchIndex', () => {
  let tmpDir: string;
  const originalCacheDir = process.env.MARIGOLD_CACHE_DIR;
  const url = `${docsUrl()}/component-search.json`;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'marigold-search-test-'));
    process.env.MARIGOLD_CACHE_DIR = tmpDir;
  });

  afterEach(() => {
    if (originalCacheDir === undefined) delete process.env.MARIGOLD_CACHE_DIR;
    else process.env.MARIGOLD_CACHE_DIR = originalCacheDir;
    fs.rmSync(tmpDir, { recursive: true, force: true });
    vi.restoreAllMocks();
  });

  test('reads a seeded cache in offline mode', async () => {
    seedCache(url, JSON.stringify(INDEX));

    const { index, cacheHit } = await loadSearchIndex({ offline: true });

    expect(cacheHit).toBe(true);
    expect(index.components.map(c => c.name)).toContain('TextField');
  });

  test('fetches and caches on a cold call, then serves warm', async () => {
    const spy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      text: async () => JSON.stringify(INDEX),
      headers: { get: () => 'application/json' },
    } as unknown as Response);

    const cold = await loadSearchIndex();
    const warm = await loadSearchIndex();

    expect(cold.cacheHit).toBe(false);
    expect(warm.cacheHit).toBe(true);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('sanitizes terminal escape sequences in cached content', async () => {
    const dirty: SearchIndex = {
      version: '\x1b[31m17.4.0\x1b[0m',
      generatedAt: '\x1b[31m2026-06-17T00:00:00Z\x1b[0m',
      baseUrl: '\x1b[31mhttps://www.marigold-ui.io\x1b[0m',
      components: [
        {
          slug: 'components/x/evil',
          name: '[31mEvil[0m',
          description: null,
          badge: null,
          headings: [],
          sections: [{ heading: 'Overview', snippet: 'beforeafter' }],
        },
      ],
    };
    seedCache(url, JSON.stringify(dirty));

    const { index } = await loadSearchIndex({ offline: true });

    expect(index.version).toBe('17.4.0');
    expect(index.generatedAt).toBe('2026-06-17T00:00:00Z');
    expect(index.baseUrl).toBe('https://www.marigold-ui.io');
    expect(index.components[0].name).toBe('Evil');
    expect(index.components[0].sections[0].snippet).toBe('beforeafter');
  });

  test('rethrows a 404 as actionable "index not found" guidance', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      text: async () => 'Not Found',
      headers: { get: () => 'text/html' },
    } as unknown as Response);

    await expect(loadSearchIndex()).rejects.toThrow(
      /Search index not found.*docs site may predate/s
    );
  });

  test('tolerates a component missing headings/sections', async () => {
    const partial = {
      baseUrl: 'https://www.marigold-ui.io',
      components: [
        { slug: 'components/x/partial', name: 'Partial', description: null },
      ],
    };
    seedCache(url, JSON.stringify(partial));

    const { index } = await loadSearchIndex({ offline: true });

    expect(index.components[0].headings).toEqual([]);
    expect(index.components[0].sections).toEqual([]);
  });
});
