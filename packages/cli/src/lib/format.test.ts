import type { PageDocs } from './docs.js';
import { formatDocs, formatList, formatSearchResults } from './format.js';
import type { Manifest } from './manifest.js';
import type { SearchResult } from './search.js';

const docs: PageDocs = {
  kind: 'component',
  name: 'Button',
  slug: 'components/actions/button',
  category: 'actions',
  description: 'Click me',
  section: 'all',
  markdown: '# Button\n\nContent.',
  url: 'https://example.com/button.md',
  cacheHit: false,
};

describe('formatDocs', () => {
  test('json output includes structured metadata', () => {
    const out = formatDocs(docs, 'json');

    const parsed = JSON.parse(out);

    expect(parsed.name).toBe('Button');
    expect(parsed.slug).toBe('components/actions/button');
    expect(parsed.category).toBe('actions');
    expect(parsed.markdown).toContain('# Button');
  });

  test('json output for a standalone page includes its category', () => {
    const page: PageDocs = {
      kind: 'page',
      name: 'Filter pattern',
      slug: 'patterns/user-input/filter',
      category: 'patterns',
      description: 'Refining data with filters',
      section: 'all',
      markdown: '# Filter\n\nContent.',
      url: 'https://example.com/patterns/user-input/filter.md',
      cacheHit: false,
    };

    const parsed = JSON.parse(formatDocs(page, 'json'));

    expect(parsed.kind).toBe('page');
    expect(parsed.name).toBe('Filter pattern');
    expect(parsed.slug).toBe('patterns/user-input/filter');
    expect(parsed.category).toBe('patterns');
  });

  test('plain output has no ANSI escapes', () => {
    const out = formatDocs(docs, 'plain');

    // eslint-disable-next-line no-control-regex
    expect(out).not.toMatch(/\x1b\[/);
  });

  test('markdown output contains the heading text', () => {
    const out = formatDocs(docs, 'markdown');

    expect(out).toContain('Button');
  });

  test('strips terminal escape sequences from injected markdown', () => {
    // Defense-in-depth: even if remote sanitization were bypassed, the
    // formatter must not emit dangerous escapes in `plain` output.
    const injected: PageDocs = {
      ...docs,
      markdown: '# Title\n\n\x1b]52;c;ZXZpbA==\x07\x1b[2J\x1b[Hgone',
    };

    const plain = formatDocs(injected, 'plain');

    // eslint-disable-next-line no-control-regex
    expect(plain).not.toMatch(/[\x1b\x07]/);
  });
});

const manifest: Manifest = {
  version: '17.4.0',
  generatedAt: '2026-04-24T00:00:00Z',
  baseUrl: 'https://www.marigold-ui.io',
  categories: [
    {
      name: 'actions',
      label: 'Actions',
      components: [
        {
          name: 'Button',
          slug: 'components/actions/button',
          description: 'Click',
        },
      ],
    },
    {
      name: 'form',
      label: 'Form',
      components: [
        {
          name: 'TextField',
          slug: 'components/form/text-field',
          description: 'Input',
        },
      ],
    },
    {
      name: 'hooks-and-utils',
      label: 'Hooks and Utils',
      components: [
        {
          name: 'useNonModal',
          slug: 'components/hooks-and-utils/use-non-modal',
          description: 'Non-modal hook',
        },
      ],
    },
  ],
  pages: [
    {
      title: 'Accessibility',
      slug: 'foundations/accessibility',
      category: 'foundations',
      description: 'A11y foundations',
    },
    {
      title: 'Forms',
      slug: 'patterns/user-input/forms',
      category: 'patterns',
      description: 'Form pattern',
    },
    {
      title: 'Installation',
      slug: 'getting-started/installation',
      category: 'getting-started',
      description: 'Install guide',
    },
    {
      title: 'Form',
      slug: 'components/form',
      category: 'components',
      description: 'Wrap your fields to submit user data',
    },
  ],
};

describe('formatList', () => {
  test('filters by category', () => {
    const out = formatList(manifest, { category: 'form' }, 'plain');

    expect(out).toContain('TextField');
    expect(out).not.toContain('Button');
  });

  test('filters by category case-insensitively', () => {
    const out = formatList(manifest, { category: 'Form' }, 'plain');

    expect(out).toContain('TextField');
    expect(out).not.toContain('Button');
  });

  test('filters by category with spaces matching kebab-case key', () => {
    const out = formatList(manifest, { category: 'Hooks and Utils' }, 'plain');

    expect(out).toContain('useNonModal');
    expect(out).not.toContain('TextField');
  });

  test('filters by search term', () => {
    const out = formatList(manifest, { search: 'click' }, 'plain');

    expect(out).toContain('Button');
    expect(out).not.toContain('TextField');
  });

  test('json output returns full structure', () => {
    const out = formatList(manifest, {}, 'json');

    const parsed = JSON.parse(out);

    expect(parsed.categories).toHaveLength(3);
    expect(parsed.version).toBe('17.4.0');
  });

  test('reports no-match gracefully', () => {
    const out = formatList(manifest, { search: 'zzz' }, 'markdown');

    expect(out).toContain('No components or pages match');
  });

  test('lists page groups by default, showing slugs', () => {
    const out = formatList(manifest, {}, 'plain');

    expect(out).toContain('Foundations');
    expect(out).toContain('foundations/accessibility');
    expect(out).toContain('Getting Started');
    expect(out).toContain('getting-started/installation');
    expect(out).toContain('Patterns');
    expect(out).toContain('patterns/user-input/forms');
  });

  test('filters to a single page category', () => {
    const out = formatList(manifest, { category: 'foundations' }, 'plain');

    expect(out).toContain('foundations/accessibility');
    expect(out).not.toContain('Button');
    expect(out).not.toContain('patterns/user-input/forms');
  });

  test('matches all pattern pages via top-level category', () => {
    const out = formatList(manifest, { category: 'patterns' }, 'plain');

    expect(out).toContain('patterns/user-input/forms');
    expect(out).not.toContain('foundations/accessibility');
  });

  test('json output includes a flat pages array with category', () => {
    const out = formatList(manifest, { category: 'getting-started' }, 'json');

    const parsed = JSON.parse(out);

    expect(parsed.categories).toHaveLength(0);
    expect(parsed.pages).toEqual([
      {
        title: 'Installation',
        slug: 'getting-started/installation',
        category: 'getting-started',
        description: 'Install guide',
      },
    ]);
  });

  test('searches across page slug and description', () => {
    const out = formatList(manifest, { search: 'a11y' }, 'plain');

    expect(out).toContain('foundations/accessibility');
    expect(out).not.toContain('Button');
  });

  test('relabels the components/ page group to avoid clashing with the taxonomy', () => {
    const out = formatList(manifest, {}, 'plain');

    expect(out).toContain('Form Overview');
    expect(out).toContain('components/form');
    // The raw 'components' segment must not surface as a generic group heading.
    expect(out).not.toMatch(/^Components$/m);
  });
});

describe('formatSearchResults', () => {
  // A match that scored only on title/headings carries no prose snippet, so
  // hits is empty. Every search.ts fixture matches a section, so this edge of
  // the documented hits contract is exercised here.
  const titleOnlyMatch: SearchResult = {
    slug: 'components/actions/button',
    name: 'Button',
    description: 'Click me',
    score: 3,
    hits: [],
  };

  test('emits an empty hits array in json when only the title matched', () => {
    const out = formatSearchResults(
      [titleOnlyMatch],
      'button',
      'https://example.com',
      'json'
    );
    const parsed = JSON.parse(out);

    expect(parsed).toEqual([
      {
        name: 'Button',
        slug: 'components/actions/button',
        score: 3,
        hits: [],
      },
    ]);
  });

  test('falls back to the description when there is no prose snippet', () => {
    const out = formatSearchResults(
      [titleOnlyMatch],
      'button',
      'https://example.com',
      'plain'
    );

    expect(out).toContain('Button');
    expect(out).toContain('Click me');
    expect(out).toContain('https://example.com/components/actions/button');
  });
});
