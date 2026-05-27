import { describe, expect, it } from 'vitest';
import { type AOMNode, checkAccessibility } from './aom-extractor.js';

const node = (overrides: Partial<AOMNode>): AOMNode => ({
  role: '',
  name: '',
  tagName: '',
  selector: '',
  hasPlaceholder: false,
  isPlaceholderOnlyLabel: false,
  ...overrides,
});

describe('checkAccessibility', () => {
  it('does not flag textbox with no name (delegated to axe-core)', () => {
    const issues = checkAccessibility([
      node({ role: 'textbox', tagName: 'INPUT' }),
    ]);
    expect(issues).toHaveLength(0);
  });

  it('warns on placeholder-only label', () => {
    const issues = checkAccessibility([
      node({
        role: 'textbox',
        tagName: 'INPUT',
        hasPlaceholder: true,
        isPlaceholderOnlyLabel: true,
      }),
    ]);
    expect(issues).toHaveLength(1);
    expect(issues[0].severity).toBe('warning');
    expect(issues[0].message).toMatch(/placeholder/);
  });

  it('does not flag heading hierarchy (delegated to axe-core)', () => {
    const issues = checkAccessibility([
      node({ role: 'heading', level: 1, tagName: 'H1', name: 'Page' }),
      node({ role: 'heading', level: 3, tagName: 'H3', name: 'Section' }),
    ]);
    expect(issues.some(i => i.message.includes('h1 to h3'))).toBe(false);
  });

  it('passes when heading levels are sequential', () => {
    const issues = checkAccessibility([
      node({ role: 'heading', level: 1, tagName: 'H1', name: 'A' }),
      node({ role: 'heading', level: 2, tagName: 'H2', name: 'B' }),
    ]);
    expect(issues).toEqual([]);
  });

  it('does not flag button with no name (delegated to axe-core)', () => {
    const issues = checkAccessibility([
      node({ role: 'button', tagName: 'BUTTON' }),
    ]);
    expect(issues).toHaveLength(0);
  });
});
