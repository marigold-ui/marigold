import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { cachePathFor } from '../lib/cache.js';
import { docsUrl } from '../lib/config.js';
import type { SearchIndex } from '../lib/search.js';
import { runSearch } from './search.js';

const INDEX: SearchIndex = {
  baseUrl: 'https://www.marigold-ui.io',
  components: [
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
      slug: 'components/form/textfield',
      name: 'TextField',
      description: 'Component for input forms.',
      badge: null,
      headings: ['Usage'],
      sections: [
        { heading: 'Usage', snippet: 'Use TextField for input validation.' },
      ],
    },
  ],
};

const seedCache = (url: string, body: string) => {
  const file = cachePathFor(url);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, body);
};

describe('runSearch', () => {
  let tmpDir: string;
  const originalCacheDir = process.env.MARIGOLD_CACHE_DIR;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'marigold-search-cmd-'));
    process.env.MARIGOLD_CACHE_DIR = tmpDir;
    seedCache(`${docsUrl()}/component-search.json`, JSON.stringify(INDEX));
  });

  afterEach(() => {
    if (originalCacheDir === undefined) delete process.env.MARIGOLD_CACHE_DIR;
    else process.env.MARIGOLD_CACHE_DIR = originalCacheDir;
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  test('renders ranked markdown with a deep link', async () => {
    const { output, cacheHit } = await runSearch({
      query: 'validation',
      offline: true,
    });

    expect(cacheHit).toBe(true);
    expect(output).toContain('FieldError');
    expect(output).toContain(
      'https://www.marigold-ui.io/components/form/field-error'
    );
  });

  test('plain format strips color codes', async () => {
    const { output } = await runSearch({
      query: 'validation',
      format: 'plain',
      offline: true,
    });

    // eslint-disable-next-line no-control-regex
    expect(output).not.toMatch(/\x1b\[/);
    expect(output).toContain('FieldError');
  });

  test('json format returns the documented contract', async () => {
    const { output } = await runSearch({
      query: 'validation',
      format: 'json',
      offline: true,
    });

    const parsed = JSON.parse(output) as Array<{
      name: string;
      slug: string;
      score: number;
      hits: { heading: string; snippet: string }[];
    }>;
    expect(parsed[0]).toMatchObject({
      name: 'FieldError',
      slug: 'components/form/field-error',
    });
    expect(parsed[0].hits.length).toBeGreaterThan(0);
  });

  test('respects --limit', async () => {
    const { output } = await runSearch({
      query: 'validation',
      limit: 1,
      format: 'json',
      offline: true,
    });

    expect(JSON.parse(output)).toHaveLength(1);
  });

  test('empty results: text message and json empty array', async () => {
    const text = await runSearch({ query: 'zzzznope', offline: true });
    const json = await runSearch({
      query: 'zzzznope',
      format: 'json',
      offline: true,
    });

    expect(text.output).toContain('No components match "zzzznope".');
    expect(JSON.parse(json.output)).toEqual([]);
  });

  test('throws on an empty query', async () => {
    await expect(runSearch({ query: '' })).rejects.toThrow(
      /Usage: marigold search/
    );
  });
});
