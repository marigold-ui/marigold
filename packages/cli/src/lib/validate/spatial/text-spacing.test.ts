import { describe, expect, it } from 'vitest';
import {
  type TextSpacingData,
  textSpacingToValidationIssues,
} from './text-spacing.js';

type TextElementMetrics = TextSpacingData['before'][number];

const metric = (
  overrides: Partial<TextElementMetrics> = {}
): TextElementMetrics => ({
  selector: 'div:nth-child(1)',
  component: 'div',
  scrollWidth: 200,
  scrollHeight: 40,
  clientWidth: 200,
  clientHeight: 40,
  overflowX: 'visible',
  overflowY: 'visible',
  position: 'static',
  display: 'block',
  textOverflow: 'clip',
  webkitLineClamp: 'none',
  rect: { x: 0, y: 0, width: 200, height: 40 },
  ...overrides,
});

describe('textSpacingToValidationIssues', () => {
  it('returns no issues when no clipping occurs', () => {
    const data: TextSpacingData = {
      before: [metric()],
      after: [metric()],
    };
    expect(textSpacingToValidationIssues(data)).toHaveLength(0);
  });

  it('flags vertical clipping caused by text spacing injection', () => {
    const data: TextSpacingData = {
      before: [
        metric({ overflowY: 'hidden', scrollHeight: 40, clientHeight: 40 }),
      ],
      after: [
        metric({ overflowY: 'hidden', scrollHeight: 60, clientHeight: 40 }),
      ],
    };
    const issues = textSpacingToValidationIssues(data);
    expect(issues).toHaveLength(1);
    expect(issues[0].severity).toBe('warning');
    expect(issues[0].source).toBe('text-spacing');
    expect(issues[0].message).toContain('vertically');
    expect(issues[0].message).toContain('WCAG 1.4.12');
  });

  it('flags horizontal clipping caused by text spacing injection', () => {
    const data: TextSpacingData = {
      before: [
        metric({ overflowX: 'hidden', scrollWidth: 200, clientWidth: 200 }),
      ],
      after: [
        metric({ overflowX: 'hidden', scrollWidth: 250, clientWidth: 200 }),
      ],
    };
    const issues = textSpacingToValidationIssues(data);
    expect(issues).toHaveLength(1);
    expect(issues[0].message).toContain('horizontally');
  });

  it('flags newly-introduced ellipsis clipping (was not truncating before)', () => {
    // Before: text-overflow:clip, not clipping. After: spacing injection turns
    // it into an ellipsis-truncating clip — a genuine new 1.4.12 failure.
    const data: TextSpacingData = {
      before: [
        metric({
          overflowX: 'hidden',
          textOverflow: 'clip',
          scrollWidth: 200,
          clientWidth: 200,
        }),
      ],
      after: [
        metric({
          overflowX: 'hidden',
          textOverflow: 'ellipsis',
          scrollWidth: 250,
          clientWidth: 200,
        }),
      ],
    };
    const issues = textSpacingToValidationIssues(data);
    expect(issues).toHaveLength(1);
    expect(issues[0].message).toContain('horizontally');
  });

  it('does NOT flag a designed single-line ellipsis that was already truncating', () => {
    // A truncating Marigold Text already has text-overflow:ellipsis +
    // overflow-x:hidden and is already clipping before injection. The injection
    // only clips it a few px more — an authored truncation, not a spacing fail.
    const data: TextSpacingData = {
      before: [
        metric({
          overflowX: 'hidden',
          textOverflow: 'ellipsis',
          webkitLineClamp: 'none',
          scrollWidth: 240,
          clientWidth: 200,
        }),
      ],
      after: [
        metric({
          overflowX: 'hidden',
          textOverflow: 'ellipsis',
          webkitLineClamp: 'none',
          scrollWidth: 280,
          clientWidth: 200,
        }),
      ],
    };
    expect(textSpacingToValidationIssues(data)).toHaveLength(0);
  });

  it('flags webkit-line-clamp clipping', () => {
    const data: TextSpacingData = {
      before: [metric({ overflowY: 'hidden', webkitLineClamp: 'none' })],
      after: [
        metric({
          overflowY: 'hidden',
          webkitLineClamp: '2',
          scrollHeight: 60,
          clientHeight: 40,
        }),
      ],
    };
    const issues = textSpacingToValidationIssues(data);
    expect(issues).toHaveLength(1);
    expect(issues[0].message).toContain('line-clamp');
  });

  it('skips elements with overflow auto/scroll on both axes', () => {
    const data: TextSpacingData = {
      before: [
        metric({
          overflowX: 'auto',
          overflowY: 'scroll',
          scrollHeight: 40,
          clientHeight: 40,
        }),
      ],
      after: [
        metric({
          overflowX: 'auto',
          overflowY: 'scroll',
          scrollHeight: 80,
          clientHeight: 40,
        }),
      ],
    };
    expect(textSpacingToValidationIssues(data)).toHaveLength(0);
  });

  it('flags horizontal clipping when overflowX is hidden but overflowY is auto', () => {
    const data: TextSpacingData = {
      before: [
        metric({
          overflowX: 'hidden',
          overflowY: 'auto',
          scrollWidth: 200,
          clientWidth: 200,
        }),
      ],
      after: [
        metric({
          overflowX: 'hidden',
          overflowY: 'auto',
          scrollWidth: 250,
          clientWidth: 200,
        }),
      ],
    };
    const issues = textSpacingToValidationIssues(data);
    expect(issues).toHaveLength(1);
    expect(issues[0].message).toContain('horizontally');
  });

  it('skips elements that were already clipping before injection', () => {
    const data: TextSpacingData = {
      before: [
        metric({ overflowY: 'hidden', scrollHeight: 60, clientHeight: 40 }),
      ],
      after: [
        metric({ overflowY: 'hidden', scrollHeight: 80, clientHeight: 40 }),
      ],
    };
    expect(textSpacingToValidationIssues(data)).toHaveLength(0);
  });

  it('skips absolute/fixed positioned elements', () => {
    const data: TextSpacingData = {
      before: [
        metric({
          position: 'absolute',
          overflowY: 'hidden',
          scrollHeight: 40,
          clientHeight: 40,
        }),
      ],
      after: [
        metric({
          position: 'absolute',
          overflowY: 'hidden',
          scrollHeight: 60,
          clientHeight: 40,
        }),
      ],
    };
    expect(textSpacingToValidationIssues(data)).toHaveLength(0);
  });

  it('skips elements smaller than minimum area', () => {
    const data: TextSpacingData = {
      before: [
        metric({
          rect: { x: 0, y: 0, width: 5, height: 5 },
          overflowY: 'hidden',
          scrollHeight: 5,
          clientHeight: 5,
        }),
      ],
      after: [
        metric({
          rect: { x: 0, y: 0, width: 5, height: 5 },
          overflowY: 'hidden',
          scrollHeight: 10,
          clientHeight: 5,
        }),
      ],
    };
    expect(textSpacingToValidationIssues(data)).toHaveLength(0);
  });

  it('skips elements with display none', () => {
    const data: TextSpacingData = {
      before: [metric({ display: 'none' })],
      after: [
        metric({
          display: 'none',
          overflowY: 'hidden',
          scrollHeight: 60,
          clientHeight: 40,
        }),
      ],
    };
    expect(textSpacingToValidationIssues(data)).toHaveLength(0);
  });

  it('skips elements not found in before data', () => {
    const data: TextSpacingData = {
      before: [],
      after: [
        metric({ overflowY: 'hidden', scrollHeight: 60, clientHeight: 40 }),
      ],
    };
    expect(textSpacingToValidationIssues(data)).toHaveLength(0);
  });

  it('handles multiple elements with mixed results', () => {
    const data: TextSpacingData = {
      before: [
        metric({
          selector: 'a',
          overflowY: 'hidden',
          scrollHeight: 40,
          clientHeight: 40,
        }),
        metric({ selector: 'b', overflowY: 'visible' }),
        metric({
          selector: 'c',
          overflowY: 'hidden',
          scrollHeight: 40,
          clientHeight: 40,
        }),
      ],
      after: [
        metric({
          selector: 'a',
          overflowY: 'hidden',
          scrollHeight: 60,
          clientHeight: 40,
        }),
        metric({
          selector: 'b',
          overflowY: 'visible',
          scrollHeight: 60,
          clientHeight: 40,
        }),
        metric({
          selector: 'c',
          overflowY: 'hidden',
          scrollHeight: 40,
          clientHeight: 40,
        }),
      ],
    };
    const issues = textSpacingToValidationIssues(data);
    expect(issues).toHaveLength(1);
    expect(issues[0].details?.selector).toBe('a');
  });
});
