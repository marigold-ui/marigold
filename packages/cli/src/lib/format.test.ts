import { describe, expect, it } from 'vitest';
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
  section: 'all',
  markdown: '# Button\n\nContent.',
  url: 'https://example.com/button.md',
  cacheHit: false,
};

describe('formatDocs', () => {
  it('json output includes structured metadata', () => {
    const out = formatDocs(docs, 'json');
    const parsed = JSON.parse(out);
    expect(parsed.name).toBe('Button');
    expect(parsed.slug).toBe('components/actions/button');
    expect(parsed.markdown).toContain('# Button');
  });

  it('plain output has no ANSI escapes', () => {
    const out = formatDocs(docs, 'plain');
    // eslint-disable-next-line no-control-regex
    expect(out).not.toMatch(/\x1b\[/);
  });

  it('markdown output contains the heading text', () => {
    const out = formatDocs(docs, 'markdown');
    expect(out).toContain('Button');
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
  ],
  pages: [],
};

describe('formatList', () => {
  it('filters by category', () => {
    const out = formatList(manifest, { category: 'form' }, 'plain');
    expect(out).toContain('TextField');
    expect(out).not.toContain('Button');
  });

  it('filters by search term', () => {
    const out = formatList(manifest, { search: 'click' }, 'plain');
    expect(out).toContain('Button');
    expect(out).not.toContain('TextField');
  });

  it('json output returns full structure', () => {
    const out = formatList(manifest, {}, 'json');
    const parsed = JSON.parse(out);
    expect(parsed.categories).toHaveLength(2);
    expect(parsed.version).toBe('17.4.0');
  });

  it('reports no-match gracefully', () => {
    const out = formatList(manifest, { search: 'zzz' }, 'markdown');
    expect(out).toContain('No components match');
  });
});
