import {
  type Manifest,
  resolveComponent,
  resolvePage,
  suggestComponents,
  suggestPages,
} from './manifest.js';

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
          description: 'Button',
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
          description: 'Text input',
        },
        { name: 'DatePicker', slug: 'components/form/date-picker' },
      ],
    },
  ],
  pages: [
    {
      title: 'Accessibility',
      slug: 'foundations/accessibility',
      category: 'foundations',
      description: 'Accessibility foundations',
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
    },
  ],
};

describe('resolveComponent', () => {
  test('matches exact name', () => {
    expect(resolveComponent(manifest, 'Button')?.component.name).toBe('Button');
  });

  test('matches exact slug', () => {
    expect(
      resolveComponent(manifest, 'components/form/text-field')?.component.name
    ).toBe('TextField');
  });

  test('matches case-insensitive lowercase name', () => {
    expect(resolveComponent(manifest, 'button')?.component.name).toBe('Button');
  });

  test('matches case-insensitive uppercase name', () => {
    expect(resolveComponent(manifest, 'BUTTON')?.component.name).toBe('Button');
  });

  test('matches kebab-case name', () => {
    expect(resolveComponent(manifest, 'text-field')?.component.name).toBe(
      'TextField'
    );
  });

  test('matches name with spaces', () => {
    expect(resolveComponent(manifest, 'text field')?.component.name).toBe(
      'TextField'
    );
  });

  test('matches name with underscores', () => {
    expect(resolveComponent(manifest, 'text_field')?.component.name).toBe(
      'TextField'
    );
  });

  test('matches name with no separators', () => {
    expect(resolveComponent(manifest, 'textfield')?.component.name).toBe(
      'TextField'
    );
  });

  test('matches slug tail', () => {
    expect(resolveComponent(manifest, 'date-picker')?.component.name).toBe(
      'DatePicker'
    );
  });

  test('returns null for unknown', () => {
    expect(resolveComponent(manifest, 'Nonexistent')).toBeNull();
  });
});

describe('suggestComponents', () => {
  test('suggests near matches', () => {
    const suggestions = suggestComponents(manifest, 'butto', 3);

    expect(suggestions.map(s => s.name)).toContain('Button');
  });

  test('returns empty for complete misses', () => {
    const suggestions = suggestComponents(manifest, 'xyzqq', 3);

    expect(suggestions).toHaveLength(0);
  });
});

describe('resolvePage', () => {
  test('matches a foundations page by exact slug', () => {
    expect(resolvePage(manifest, 'foundations/accessibility')?.title).toBe(
      'Accessibility'
    );
  });

  test('matches a foundations page by title', () => {
    expect(resolvePage(manifest, 'Accessibility')?.slug).toBe(
      'foundations/accessibility'
    );
  });

  test('matches a getting-started page case-insensitively', () => {
    expect(resolvePage(manifest, 'installation')?.slug).toBe(
      'getting-started/installation'
    );
  });

  test('matches a patterns page by slug tail', () => {
    expect(resolvePage(manifest, 'forms')?.slug).toBe(
      'patterns/user-input/forms'
    );
  });

  test('returns null for unknown', () => {
    expect(resolvePage(manifest, 'nonexistent')).toBeNull();
  });
});

describe('suggestPages', () => {
  test('suggests near matches over title and slug', () => {
    const suggestions = suggestPages(manifest, 'access', 3);

    expect(suggestions.map(p => p.slug)).toContain('foundations/accessibility');
  });

  test('returns empty for complete misses', () => {
    expect(suggestPages(manifest, 'xyzqq', 3)).toHaveLength(0);
  });
});
