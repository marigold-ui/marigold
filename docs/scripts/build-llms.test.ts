import { describe, expect, it } from 'vitest';
import {
  type Manifest,
  type ManifestPage,
  buildIndex,
  groupPages,
  humanizeCategory,
  readCategories,
} from './build-llms';

const page = (overrides: Partial<ManifestPage> = {}): ManifestPage => ({
  name: 'Button',
  slug: 'components/actions/button',
  category: 'components/actions',
  description: 'Buttons allow users to trigger actions.',
  badge: null,
  url: '/components/actions/button.md',
  ...overrides,
});

const manifest = (pages: ManifestPage[]): Manifest => ({
  baseUrl: 'https://www.marigold-ui.io',
  pages,
});

const CATEGORIES = readCategories(['components', 'patterns'], {
  components: ['---Actions---', '...actions', '---Layout---', '...layout'],
  patterns: ['---User Input---', '...user-input'],
});

describe('humanizeCategory', () => {
  it('turns a slug into a label', () => {
    expect(humanizeCategory('getting-started')).toBe('Getting Started');
    expect(humanizeCategory('components/hooks-and-utils')).toBe(
      'Components / Hooks and Utils'
    );
  });
});

describe('readCategories', () => {
  it('labels a folder spread from the separator above it', () => {
    expect(CATEGORIES).toEqual([
      { category: 'components', label: 'Components' },
      { category: 'components/actions', label: 'Components / Actions' },
      { category: 'components/layout', label: 'Components / Layout' },
      { category: 'patterns', label: 'Patterns' },
      { category: 'patterns/user-input', label: 'Patterns / User Input' },
    ]);
  });

  it('falls back to the folder name when no separator precedes it', () => {
    expect(readCategories(['components'], { components: ['...form'] })).toEqual(
      [
        { category: 'components', label: 'Components' },
        { category: 'components/form', label: 'Components / Form' },
      ]
    );
  });
});

describe('groupPages', () => {
  it('orders categories like the sidebar, not alphabetically', () => {
    const grouped = groupPages(
      [
        page({
          slug: 'components/layout/stack',
          category: 'components/layout',
        }),
        page(),
      ],
      CATEGORIES
    );

    expect(grouped.map(group => group.label)).toEqual([
      'Components / Actions',
      'Components / Layout',
    ]);
  });

  it('puts a category missing from meta.json last', () => {
    const grouped = groupPages(
      [page({ category: 'nowhere' }), page()],
      CATEGORIES
    );

    expect(grouped.map(group => group.label)).toEqual([
      'Components / Actions',
      'Nowhere',
    ]);
  });
});

describe('buildIndex', () => {
  it('links each page at its .md URL', () => {
    const index = buildIndex(manifest([page()]), CATEGORIES);

    expect(index).toContain('# Marigold Design System');
    expect(index).toContain('## Components / Actions');
    expect(index).toContain(
      '- [Button](https://www.marigold-ui.io/components/actions/button.md): Buttons allow users to trigger actions.'
    );
  });

  it('prefixes the description with a badge when there is one', () => {
    const index = buildIndex(manifest([page({ badge: 'beta' })]), CATEGORIES);

    expect(index).toContain('.md): (beta) Buttons allow users');
  });

  it('omits the note entirely for a page without description or badge', () => {
    const index = buildIndex(
      manifest([page({ description: null })]),
      CATEGORIES
    );

    expect(index).toContain(
      '- [Button](https://www.marigold-ui.io/components/actions/button.md)\n'
    );
  });

  it('points at the sibling machine-readable entry points', () => {
    const index = buildIndex(manifest([page()]), CATEGORIES);

    expect(index).toContain('https://www.marigold-ui.io/manifest.json');
    expect(index).toContain('https://www.marigold-ui.io/rss.xml');
  });
});
