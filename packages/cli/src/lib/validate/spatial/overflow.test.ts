import { describe, expect, it } from 'vitest';
import {
  type OverflowDetection,
  type WrappingDetection,
  overflowToValidationIssues,
  wrappingToValidationIssues,
} from './overflow.js';

const makeWrapping = (
  overrides: Partial<WrappingDetection> = {}
): WrappingDetection => ({
  containerSelector: 'body > div:nth-child(1)',
  rowCount: 2,
  childCount: 5,
  containerWidth: 400,
  totalChildrenWidth: 600,
  ...overrides,
});

const makeOverflow = (
  overrides: Partial<OverflowDetection> = {}
): OverflowDetection => ({
  containerSelector: 'body > div:nth-child(1)',
  overflow: 'hidden',
  childrenOverflowX: true,
  childrenOverflowY: false,
  containerRect: { width: 400, height: 300 },
  maxChildExtent: { right: 550, bottom: 290 },
  ...overrides,
});

describe('wrappingToValidationIssues', () => {
  it('returns empty array for empty input', () => {
    expect(wrappingToValidationIssues([])).toEqual([]);
  });

  it('produces a warning for each wrapping detection', () => {
    const issues = wrappingToValidationIssues([makeWrapping()]);
    expect(issues).toHaveLength(1);
    expect(issues[0].severity).toBe('warning');
  });

  it('message includes row count', () => {
    const issues = wrappingToValidationIssues([makeWrapping({ rowCount: 3 })]);
    expect(issues[0].message).toContain('3 rows');
  });

  it('message includes child count and container width', () => {
    const issues = wrappingToValidationIssues([
      makeWrapping({ childCount: 8, containerWidth: 320 }),
    ]);
    expect(issues[0].message).toContain('8 children');
    expect(issues[0].message).toContain('320px');
  });

  it('type is always spatial', () => {
    const issues = wrappingToValidationIssues([makeWrapping()]);
    expect(issues[0].type).toBe('spatial');
  });

  it('suggestion mentions Columns and Stack', () => {
    const issues = wrappingToValidationIssues([makeWrapping()]);
    expect(issues[0].suggestion).toContain('<Columns');
    expect(issues[0].suggestion).toContain('<Stack>');
  });

  it('handles multiple detections', () => {
    const issues = wrappingToValidationIssues([
      makeWrapping(),
      makeWrapping({ containerSelector: 'body > div:nth-child(2)' }),
    ]);
    expect(issues).toHaveLength(2);
  });
});

describe('overflowToValidationIssues', () => {
  it('returns empty array for empty input', () => {
    expect(overflowToValidationIssues([])).toEqual([]);
  });

  it('produces a warning for X-axis overflow', () => {
    const issues = overflowToValidationIssues([
      makeOverflow({ childrenOverflowX: true, childrenOverflowY: false }),
    ]);
    expect(issues).toHaveLength(1);
    expect(issues[0].severity).toBe('warning');
  });

  it('produces a warning for Y-axis overflow', () => {
    const issues = overflowToValidationIssues([
      makeOverflow({ childrenOverflowX: false, childrenOverflowY: true }),
    ]);
    expect(issues).toHaveLength(1);
  });

  it('message includes container dimensions', () => {
    const issues = overflowToValidationIssues([
      makeOverflow({
        containerRect: { width: 500, height: 200 },
        maxChildExtent: { right: 700, bottom: 180 },
      }),
    ]);
    expect(issues[0].message).toContain('500x200px');
    expect(issues[0].message).toContain('700x180px');
  });

  it('message includes overflow value', () => {
    const issues = overflowToValidationIssues([
      makeOverflow({ overflow: 'scroll' }),
    ]);
    expect(issues[0].message).toContain('scroll');
  });

  it('type is always spatial', () => {
    const issues = overflowToValidationIssues([makeOverflow()]);
    expect(issues[0].type).toBe('spatial');
  });

  it('suggestion mentions responsive sizing', () => {
    const issues = overflowToValidationIssues([makeOverflow()]);
    expect(issues[0].suggestion).toContain('responsive');
  });
});
