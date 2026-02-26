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
  it.each([
    ['0', true],
    ['1', true],
    ['42', true],
    ['999', true],
    ['0.5', true],
    ['1.25', true],
    ['2.0', true],
    ['10.99', true],
    ['abc', false],
    ['px', false],
    ['1px', false],
    ['1!', false],
    ['1-2', false],
    ['1_2', false],
    ['', false],
    ['1 2', false],
    [' 1', false],
    ['1 ', false],
    ['1.', false],
    ['.5', false],
    ['1..5', false],
  ])('should return %s for "%s"', (input, expected) => {
    expect(isScale(input)).toBe(expected);
  });
});

describe('isFraction', () => {
  it.each([
    ['1/2', true],
    ['2/3', true],
    ['3/4', true],
    ['10/20', true],
    ['100/200', true],
    ['999/1000', true],
    ['1', false],
    ['1.5', false],
    ['42', false],
    ['1/2/3', false],
    ['1//2', false],
    ['', false],
    ['1 / 2', false],
    [' 1/2', false],
    ['1/2 ', false],
    ['a/b', false],
    ['one/two', false],
    ['1/', false],
    ['/2', false],
  ])('should return %s for "%s"', (input, expected) => {
    expect(isFraction(input)).toBe(expected);
  });
});

describe('isValidCssCustomPropertyName', () => {
  it.each([
    ['primary-color', true],
    ['spacing-lg', true],
    ['border-radius-md', true],
    ['primary_color', true],
    ['my_var', true],
    ['color1', true],
    ['spacing-2xl', true],
    ['color', true],
    ['primaryColor', true],
    ['', false],
    ['color!', false],
    ['primary@color', false],
    ['color.primary', false],
    ['primary color', false],
  ])('should return %s for "%s"', (input, expected) => {
    expect(isValidCssCustomPropertyName(input)).toBe(expected);
  });
});

describe('ensureCssVar', () => {
  it.each([
    ['color', undefined, 'var(--color, color)'],
    ['primary-color', undefined, 'var(--primary-color, primary-color)'],
    ['color', 'theme', 'var(--theme-color, color)'],
    ['spacing-lg', 'spacing', 'var(--spacing-spacing-lg, spacing-lg)'],
    ['invalid-color!', undefined, 'invalid-color!'],
    ['color@primary', undefined, 'color@primary'],
    ['color1', undefined, 'var(--color1, color1)'],
    ['2xl', 'size', 'var(--size-2xl, 2xl)'],
    ['my_color', undefined, 'var(--my_color, my_color)'],
    ['primary_color', 'token', 'var(--token-primary_color, primary_color)'],
    ['bg-color', 'theme', 'var(--theme-bg-color, bg-color)'],
  ])(
    'should return "%s" for value "%s" with prefix "%s"',
    (value, prefix, expected) => {
      expect(ensureCssVar(value, prefix)).toBe(expected);
    }
  );
});

describe('createVar', () => {
  it.each([
    [
      'string values',
      { color: 'red', size: '16' },
      { '--color': 'red', '--size': '16' },
    ],
    [
      'numeric values',
      { spacing: 8, opacity: 0.5 },
      { '--spacing': 8, '--opacity': 0.5 },
    ],
    [
      'undefined values',
      { color: 'blue', missing: undefined },
      { '--color': 'blue', '--missing': undefined },
    ],
    [
      'hyphenated names',
      { 'primary-color': '#000', 'border-radius': '4px' },
      { '--primary-color': '#000', '--border-radius': '4px' },
    ],
    ['empty object', {}, {}],
  ])('should handle %s', (_label, input, expected) => {
    expect(createVar(input)).toEqual(expected);
  });
});

describe('createSpacingVar', () => {
  it.each([
    ['gap', '4', { '--gap': 'calc(var(--spacing) * 4)' }],
    ['padding', '2.5', { '--padding': 'calc(var(--spacing) * 2.5)' }],
    ['margin', 'group', { '--margin': 'var(--spacing-group)' }],
    [
      'custom-spacing-name',
      'regular',
      { '--custom-spacing-name': 'var(--spacing-regular)' },
    ],
  ])(
    'should create spacing var for name "%s" with value "%s"',
    (name, value, expected) => {
      expect(createSpacingVar(name, value)).toEqual(expected);
    }
  );

  it.each(['joined', 'tight', 'related', 'group', 'region'])(
    'should reference spacing token "%s"',
    token => {
      expect(createSpacingVar('space', token)).toEqual({
        '--space': `var(--spacing-${token})`,
      });
    }
  );
});

describe('createWidthVar', () => {
  it.each([
    ['4', { '--width': 'calc(var(--spacing) * 4)' }],
    ['2.5', { '--width': 'calc(var(--spacing) * 2.5)' }],
    ['1/2', { '--width': 'calc((1 / 2) * 100%)' }],
    ['2/3', { '--width': 'calc((2 / 3) * 100%)' }],
    ['3/4', { '--width': 'calc((3 / 4) * 100%)' }],
    ['fit', { '--width': 'fit-content' }],
    ['min', { '--width': 'min-content' }],
    ['max', { '--width': 'max-content' }],
    ['full', { '--width': '100%' }],
    ['screen', { '--width': '100vw' }],
    ['auto', { '--width': 'auto' }],
  ])('should resolve width value "%s"', (value, expected) => {
    expect(createWidthVar('width', value)).toEqual(expected);
  });

  it('should handle custom property names', () => {
    expect(createWidthVar('custom-width-name', '8')).toEqual({
      '--custom-width-name': 'calc(var(--spacing) * 8)',
    });
  });

  it.each(['invalid', 'px', '10px'])(
    'should throw an error for unsupported value "%s"',
    value => {
      expect(() => createWidthVar('width', value)).toThrowError(
        `Unsupported width value: "${value}". Expected a keyword (fit, min, max, full, screen, auto), a scale number, or a fraction (e.g., "1/2").`
      );
    }
  );
});
