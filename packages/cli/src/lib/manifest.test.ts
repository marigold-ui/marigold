import {
  type Manifest,
  resolveComponent,
  suggestComponents,
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
  pages: [],
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
