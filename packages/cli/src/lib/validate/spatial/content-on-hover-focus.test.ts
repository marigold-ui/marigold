import { describe, expect, it } from 'vitest';
import {
  type HoverFocusObservation,
  contentOnHoverFocusIssues,
} from './content-on-hover-focus.js';

const obs = (
  over: Partial<HoverFocusObservation> = {}
): HoverFocusObservation => ({
  triggerSelector: 'button:nth-child(1)',
  triggerComponent: 'Tooltip',
  revealed: true,
  dismissable: true,
  hoverable: true,
  persistent: true,
  ...over,
});

describe('contentOnHoverFocusIssues', () => {
  it('returns nothing for a well-behaved tooltip', () => {
    expect(contentOnHoverFocusIssues([obs()])).toEqual([]);
  });

  it('does not assess content that never revealed', () => {
    expect(
      contentOnHoverFocusIssues([
        obs({ revealed: false, dismissable: false, hoverable: false }),
      ])
    ).toEqual([]);
  });

  it('flags non-dismissable content', () => {
    const issues = contentOnHoverFocusIssues([obs({ dismissable: false })]);
    expect(issues).toHaveLength(1);
    expect(issues[0].source).toBe('content-on-hover-focus');
    expect(issues[0].message).toContain('Escape');
    expect(issues[0].message).toContain('1.4.13');
  });

  it('flags non-hoverable content', () => {
    const issues = contentOnHoverFocusIssues([obs({ hoverable: false })]);
    expect(issues).toHaveLength(1);
    expect(issues[0].message).toContain('pointer');
  });

  it('flags non-persistent (auto-hiding) content', () => {
    const issues = contentOnHoverFocusIssues([obs({ persistent: false })]);
    expect(issues).toHaveLength(1);
    expect(issues[0].message).toContain('disappears on its own');
  });

  it('combines multiple failures into one finding', () => {
    const issues = contentOnHoverFocusIssues([
      obs({ dismissable: false, persistent: false }),
    ]);
    expect(issues).toHaveLength(1);
    expect(issues[0].message).toContain('Escape');
    expect(issues[0].message).toContain('disappears on its own');
  });

  it('severity is warning', () => {
    expect(
      contentOnHoverFocusIssues([obs({ hoverable: false })])[0].severity
    ).toBe('warning');
  });
});
