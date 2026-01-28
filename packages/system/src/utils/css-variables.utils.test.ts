import { describe, expect, it } from 'vitest';
import {
  createSpacingVar,
  createVar,
  createWidthVar,
  ensureCssVar,
  isFraction,
  isScale,
  isValidCssCustomPropertyName,
} from './css-variables.utils';

describe('isScale', () => {
  it('should return true for integers', () => {
    expect(isScale('0')).toBe(true);
    expect(isScale('1')).toBe(true);
    expect(isScale('42')).toBe(true);
    expect(isScale('999')).toBe(true);
  });

  it('should return true for decimal numbers', () => {
    expect(isScale('0.5')).toBe(true);
    expect(isScale('1.25')).toBe(true);
    expect(isScale('2.0')).toBe(true);
    expect(isScale('10.99')).toBe(true);
  });

  it('should return false for non-numeric strings', () => {
    expect(isScale('abc')).toBe(false);
    expect(isScale('px')).toBe(false);
    expect(isScale('1px')).toBe(false);
  });

  it('should return false for strings with special characters', () => {
    expect(isScale('1!')).toBe(false);
    expect(isScale('1-2')).toBe(false);
    expect(isScale('1_2')).toBe(false);
  });

  it('should return false for empty strings', () => {
    expect(isScale('')).toBe(false);
  });

  it('should return false for strings with spaces', () => {
    expect(isScale('1 2')).toBe(false);
    expect(isScale(' 1')).toBe(false);
    expect(isScale('1 ')).toBe(false);
  });

  it('should return false for invalid decimal formats', () => {
    expect(isScale('1.')).toBe(false);
    expect(isScale('.5')).toBe(false);
    expect(isScale('1..5')).toBe(false);
  });
});

describe('isFraction', () => {
  it('should return true for valid fractions', () => {
    expect(isFraction('1/2')).toBe(true);
    expect(isFraction('2/3')).toBe(true);
    expect(isFraction('3/4')).toBe(true);
    expect(isFraction('10/20')).toBe(true);
  });

  it('should return true for fractions with larger numbers', () => {
    expect(isFraction('100/200')).toBe(true);
    expect(isFraction('999/1000')).toBe(true);
  });

  it('should return false for non-fraction numeric strings', () => {
    expect(isFraction('1')).toBe(false);
    expect(isFraction('1.5')).toBe(false);
    expect(isFraction('42')).toBe(false);
  });

  it('should return false for strings with multiple slashes', () => {
    expect(isFraction('1/2/3')).toBe(false);
    expect(isFraction('1//2')).toBe(false);
  });

  it('should return false for empty strings', () => {
    expect(isFraction('')).toBe(false);
  });

  it('should return false for strings with spaces', () => {
    expect(isFraction('1 / 2')).toBe(false);
    expect(isFraction(' 1/2')).toBe(false);
    expect(isFraction('1/2 ')).toBe(false);
  });

  it('should return false for non-numeric fractions', () => {
    expect(isFraction('a/b')).toBe(false);
    expect(isFraction('one/two')).toBe(false);
  });

  it('should return false for incomplete fractions', () => {
    expect(isFraction('1/')).toBe(false);
    expect(isFraction('/2')).toBe(false);
  });
});

describe('isValidCssCustomPropertyName', () => {
  it('should accept valid property names with hyphens', () => {
    expect(isValidCssCustomPropertyName('primary-color')).toBe(true);
    expect(isValidCssCustomPropertyName('spacing-lg')).toBe(true);
    expect(isValidCssCustomPropertyName('border-radius-md')).toBe(true);
  });

  it('should accept property names with underscores', () => {
    expect(isValidCssCustomPropertyName('primary_color')).toBe(true);
    expect(isValidCssCustomPropertyName('my_var')).toBe(true);
  });

  it('should accept property names with digits', () => {
    expect(isValidCssCustomPropertyName('color1')).toBe(true);
    expect(isValidCssCustomPropertyName('spacing-2xl')).toBe(true);
  });

  it('should accept property names with letters', () => {
    expect(isValidCssCustomPropertyName('color')).toBe(true);
    expect(isValidCssCustomPropertyName('primaryColor')).toBe(true);
  });

  it('should reject empty strings', () => {
    expect(isValidCssCustomPropertyName('')).toBe(false);
  });

  it('should reject property names with special characters', () => {
    expect(isValidCssCustomPropertyName('color!')).toBe(false);
    expect(isValidCssCustomPropertyName('primary@color')).toBe(false);
    expect(isValidCssCustomPropertyName('color.primary')).toBe(false);
  });

  it('should reject property names with spaces', () => {
    expect(isValidCssCustomPropertyName('primary color')).toBe(false);
  });
});

describe('ensureCssVar', () => {
  it('should format valid property name as CSS variable reference', () => {
    expect(ensureCssVar('color')).toBe('var(--color, color)');
    expect(ensureCssVar('primary-color')).toBe(
      'var(--primary-color, primary-color)'
    );
  });

  it('should add prefix to CSS variable reference', () => {
    expect(ensureCssVar('color', 'theme')).toBe('var(--theme-color, color)');
    expect(ensureCssVar('spacing-lg', 'spacing')).toBe(
      'var(--spacing-spacing-lg, spacing-lg)'
    );
  });

  it('should return original value for invalid property names', () => {
    expect(ensureCssVar('invalid-color!')).toBe('invalid-color!');
    expect(ensureCssVar('color@primary')).toBe('color@primary');
  });

  it('should handle numeric strings as valid property names', () => {
    expect(ensureCssVar('color1')).toBe('var(--color1, color1)');
    expect(ensureCssVar('2xl', 'size')).toBe('var(--size-2xl, 2xl)');
  });

  it('should handle underscores in property names', () => {
    expect(ensureCssVar('my_color')).toBe('var(--my_color, my_color)');
    expect(ensureCssVar('primary_color', 'token')).toBe(
      'var(--token-primary_color, primary_color)'
    );
  });

  it('should handle hyphens in property names with prefix', () => {
    expect(ensureCssVar('bg-color', 'theme')).toBe(
      'var(--theme-bg-color, bg-color)'
    );
  });
});

describe('createVar', () => {
  it('should create CSS custom properties from an object', () => {
    const result = createVar({ color: 'red', size: '16' });

    expect(result).toEqual({
      '--color': 'red',
      '--size': '16',
    });
  });

  it('should handle numeric values', () => {
    const result = createVar({ spacing: 8, opacity: 0.5 });

    expect(result).toEqual({
      '--spacing': 8,
      '--opacity': 0.5,
    });
  });

  it('should handle undefined values', () => {
    const result = createVar({ color: 'blue', missing: undefined });

    expect(result).toEqual({
      '--color': 'blue',
      '--missing': undefined,
    });
  });

  it('should create CSS properties with hyphenated names', () => {
    const result = createVar({
      'primary-color': '#000',
      'border-radius': '4px',
    });

    expect(result).toEqual({
      '--primary-color': '#000',
      '--border-radius': '4px',
    });
  });

  it('should handle empty object', () => {
    const result = createVar({});

    expect(result).toEqual({});
  });
});

describe('createSpacingVar', () => {
  it('should return a CSS custom property with a number value using calc', () => {
    const result = createSpacingVar('gap', '4');

    expect(result).toEqual({
      '--gap': 'calc(var(--spacing) * 4)',
    });
  });

  it('should return a CSS custom property with a decimal value', () => {
    const result = createSpacingVar('padding', '2.5');

    expect(result).toEqual({
      '--padding': 'calc(var(--spacing) * 2.5)',
    });
  });

  it('should reference a spacing variable for non-number values', () => {
    const result = createSpacingVar('margin', 'group');

    expect(result).toEqual({
      '--margin': 'var(--spacing-group)',
    });
  });

  it('should handle custom property names', () => {
    const result = createSpacingVar('custom-spacing-name', 'peer');

    expect(result).toEqual({
      '--custom-spacing-name': 'var(--spacing-peer)',
    });
  });

  it('should handle semantic spacing tokens', () => {
    const tokens = ['joined', 'tight', 'related', 'group', 'region'];
    tokens.forEach(token => {
      const result = createSpacingVar('space', token);

      expect(result).toEqual({
        '--space': `var(--spacing-${token})`,
      });
    });
  });
});

describe('createWidthVar', () => {
  it('should return a CSS custom property with a number value using calc', () => {
    const result = createWidthVar('width', '4');

    expect(result).toEqual({
      '--width': 'calc(var(--spacing) * 4)',
    });
  });

  it('should return a CSS custom property with a decimal value', () => {
    const result = createWidthVar('width', '2.5');

    expect(result).toEqual({
      '--width': 'calc(var(--spacing) * 2.5)',
    });
  });

  it('should convert fractions to percentage', () => {
    expect(createWidthVar('width', '1/2')).toEqual({
      '--width': 'calc((1 / 2) * 100%)',
    });

    expect(createWidthVar('width', '2/3')).toEqual({
      '--width': 'calc((2 / 3) * 100%)',
    });

    expect(createWidthVar('width', '3/4')).toEqual({
      '--width': 'calc((3 / 4) * 100%)',
    });
  });

  it('should handle keyword values', () => {
    expect(createWidthVar('width', 'fit')).toEqual({
      '--width': 'fit-content',
    });

    expect(createWidthVar('width', 'min')).toEqual({
      '--width': 'min-content',
    });

    expect(createWidthVar('width', 'max')).toEqual({
      '--width': 'max-content',
    });

    expect(createWidthVar('width', 'full')).toEqual({
      '--width': '100%',
    });

    expect(createWidthVar('width', 'screen')).toEqual({
      '--width': '100vw',
    });

    expect(createWidthVar('width', 'auto')).toEqual({
      '--width': 'auto',
    });
  });

  it('should handle custom property names', () => {
    const result = createWidthVar('custom-width-name', '8');

    expect(result).toEqual({
      '--custom-width-name': 'calc(var(--spacing) * 8)',
    });
  });

  it('should fall back to raw value when not a keyword, scale, or fraction', () => {
    expect(createWidthVar('width', '200px')).toEqual({
      '--width': '200px',
    });

    expect(createWidthVar('width', '50%')).toEqual({
      '--width': '50%',
    });

    expect(createWidthVar('width', 'var(--custom-width)')).toEqual({
      '--width': 'var(--custom-width)',
    });

    expect(createWidthVar('width', 'test')).toEqual({
      '--width': 'test',
    });
  });
});
