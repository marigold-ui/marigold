import type { ComponentDocs } from './docs.js';
import { formatDocs, formatList } from './format.js';
import type { Manifest } from './manifest.js';

const docs: ComponentDocs = {
  component: {
    name: 'Button',
    slug: 'components/actions/button',
    description: 'Click me',
  },
  category: { name: 'actions', label: 'Actions', components: [] },
  title: 'Button',
  slug: 'components/actions/button',
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

  test('json output for a standalone page has a null category', () => {
    const page: ComponentDocs = {
      title: 'Filter pattern',
      slug: 'patterns/user-input/filter',
      description: 'Refining data with filters',
      section: 'all',
      markdown: '# Filter\n\nContent.',
      url: 'https://example.com/patterns/user-input/filter.md',
      cacheHit: false,
    };

    const parsed = JSON.parse(formatDocs(page, 'json'));

    expect(parsed.name).toBe('Filter pattern');
    expect(parsed.slug).toBe('patterns/user-input/filter');
    expect(parsed.category).toBeNull();
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
    const injected: ComponentDocs = {
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
  pages: [],
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

    expect(out).toContain('No components match');
  });
});
