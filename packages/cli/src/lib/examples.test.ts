import {
  type ExampleDetail,
  type ExamplesManifest,
  resolveExample,
  suggestExamples,
} from './examples.js';
import { formatExample, formatExamplesList } from './format.js';

const manifest: ExamplesManifest = {
  version: '17.6.0',
  generatedAt: '2026-06-12T00:00:00Z',
  baseUrl: 'https://www.marigold-ui.io',
  examples: [
    {
      slug: 'filter',
      title: 'Filterable data table with applied-filter chips',
      brief: 'A searchable, filterable venues table.',
      patterns: ['user-input/filter'],
    },
    {
      slug: 'form',
      title: 'Multi-section event form',
      brief: 'A long event-creation form.',
      patterns: ['user-input/forms'],
    },
    {
      slug: 'inventory',
      title: 'Component inventory showcase',
      brief: 'A kitchen-sink reference of components.',
      patterns: [],
    },
  ],
};

const detail: ExampleDetail = {
  slug: 'filter',
  title: 'Filterable data table with applied-filter chips',
  brief: 'A searchable, filterable venues table.',
  patterns: ['user-input/filter'],
  mockData: [{ alias: '@/lib/data/venues', shape: 'export const venues: []' }],
  keyFiles: ['utils.tsx', 'toolbar.tsx'],
  scaffoldingFiles: ['page.tsx'],
  peerDeps: ['nuqs', 'zod'],
  files: [
    { path: 'utils.tsx', source: 'export const x = 1;' },
    { path: 'page.tsx', source: 'export default () => null;' },
  ],
  url: 'https://www.marigold-ui.io/mcp/examples/filter.json',
};

describe('resolveExample', () => {
  test('matches exact slug', () => {
    expect(resolveExample(manifest, 'filter')?.slug).toBe('filter');
  });

  test('matches exact title', () => {
    expect(resolveExample(manifest, 'Multi-section event form')?.slug).toBe(
      'form'
    );
  });

  test('matches case-insensitive title', () => {
    expect(resolveExample(manifest, 'multi-section event form')?.slug).toBe(
      'form'
    );
  });

  test('matches normalized slug', () => {
    expect(resolveExample(manifest, 'INVENTORY')?.slug).toBe('inventory');
  });

  test('returns null for unknown', () => {
    expect(resolveExample(manifest, 'nope')).toBeNull();
  });
});

describe('suggestExamples', () => {
  test('suggests near matches', () => {
    expect(suggestExamples(manifest, 'filt').map(e => e.slug)).toContain(
      'filter'
    );
  });

  test('returns empty for complete misses', () => {
    expect(suggestExamples(manifest, 'zzzzz')).toHaveLength(0);
  });
});

describe('formatExamplesList', () => {
  test('json output lists all examples', () => {
    const out = JSON.parse(formatExamplesList(manifest.examples, 'json'));

    expect(out.examples).toHaveLength(3);
    expect(out.examples[0].slug).toBe('filter');
  });

  test('plain output includes slugs, titles and the get hint', () => {
    const out = formatExamplesList(manifest.examples, 'plain');

    expect(out).toContain('filter');
    expect(out).toContain('Multi-section event form');
    expect(out).toContain('marigold examples get <slug>');
  });

  test('empty list reports nothing available', () => {
    expect(formatExamplesList([], 'plain')).toContain('No examples available');
  });
});

describe('formatExample', () => {
  test('json output carries the full payload', () => {
    const out = JSON.parse(formatExample(detail, 'json'));

    expect(out.slug).toBe('filter');
    expect(out.peerDeps).toEqual(['nuqs', 'zod']);
    expect(out.files).toHaveLength(2);
    expect(out.url).toContain('/mcp/examples/filter.json');
  });

  test('plain output surfaces metadata, sources and the framework note', () => {
    const out = formatExample(detail, 'plain');

    expect(out).toContain('user-input/filter');
    expect(out).toContain('@/lib/data/venues');
    expect(out).toContain('export const x = 1;');
    expect(out).toContain('getting-started/examples-for-agents');
  });

  test('markdown output (default format) renders without throwing', () => {
    const out = formatExample(detail, 'markdown');

    expect(out.length).toBeGreaterThan(0);
    expect(out).toContain(detail.title);
    expect(out).toContain('examples-for-agents');
  });
});
