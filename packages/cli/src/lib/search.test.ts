import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { cachePathFor } from './cache.js';
import { docsUrl } from './config.js';
import {
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
});
