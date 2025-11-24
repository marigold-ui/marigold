import { describe, expect, it } from 'vitest';
import { spacing } from './spacing.utils';

describe('spacing', () => {
  it('should return a CSS custom property with a number value using calc', () => {
    const result = spacing('gap', '4');
    expect(result).toEqual({
      '--gap': 'calc(var(--spacing) * 4)',
    });
  });

  it('should return a CSS custom property with a decimal value', () => {
    const result = spacing('padding', '2.5');
    expect(result).toEqual({
      '--padding': 'calc(var(--spacing) * 2.5)',
    });
  });

  it('should reference a spacing variable for non-decimal values', () => {
    const result = spacing('margin', 'group');
    expect(result).toEqual({
      '--margin': 'var(--spacing-group)',
    });
  });

  it('should handle custom property names', () => {
    const result = spacing('custom-spacing-name', 'peer');
    expect(result).toEqual({
      '--custom-spacing-name': 'var(--spacing-peer)',
    });
  });
});
