import { describe, expect, it } from 'vitest';
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
  it('matches exact name', () => {
    expect(resolveComponent(manifest, 'Button')?.component.name).toBe('Button');
  });

  it('matches exact slug', () => {
    expect(
      resolveComponent(manifest, 'components/form/text-field')?.component.name
    ).toBe('TextField');
  });

  it('matches case-insensitive name', () => {
    expect(resolveComponent(manifest, 'button')?.component.name).toBe('Button');
    expect(resolveComponent(manifest, 'BUTTON')?.component.name).toBe('Button');
  });

  it('matches normalized (kebab/space/underscore)', () => {
    expect(resolveComponent(manifest, 'text-field')?.component.name).toBe(
      'TextField'
    );
    expect(resolveComponent(manifest, 'text field')?.component.name).toBe(
      'TextField'
    );
    expect(resolveComponent(manifest, 'text_field')?.component.name).toBe(
      'TextField'
    );
    expect(resolveComponent(manifest, 'textfield')?.component.name).toBe(
      'TextField'
    );
  });

  it('matches slug tail', () => {
    expect(resolveComponent(manifest, 'date-picker')?.component.name).toBe(
      'DatePicker'
    );
  });

  it('returns null for unknown', () => {
    expect(resolveComponent(manifest, 'Nonexistent')).toBeNull();
  });
});

describe('suggestComponents', () => {
  it('suggests near matches', () => {
    const suggestions = suggestComponents(manifest, 'butto', 3);
    expect(suggestions.map(s => s.name)).toContain('Button');
  });

  it('returns empty for complete misses', () => {
    const suggestions = suggestComponents(manifest, 'xyzqq', 3);
    expect(suggestions).toHaveLength(0);
  });
});
