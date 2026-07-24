import { describe, expect, it } from 'vitest';
import {
  type NonTextContrastDatum,
  nonTextContrastToValidationIssues,
} from './non-text-contrast.js';

const base: NonTextContrastDatum = {
  selector: 'button:nth-child(1)',
  component: 'Button',
  role: 'button',
  disabled: false,
  hasVisibleBorder: false,
  borderColor: null,
  ownBackground: 'rgba(0, 0, 0, 0)',
  ancestorBackgrounds: ['rgb(255, 255, 255)'],
  backdropHasImage: false,
};

describe('nonTextContrastToValidationIssues', () => {
  it('returns nothing for clean input', () => {
    expect(nonTextContrastToValidationIssues([])).toEqual([]);
  });

  it('flags a low-contrast visible border against a white page', () => {
    const issues = nonTextContrastToValidationIssues([
      {
        ...base,
        hasVisibleBorder: true,
        borderColor: 'rgb(235, 235, 235)',
      },
    ]);
    expect(issues).toHaveLength(1);
    expect(issues[0].source).toBe('non-text-contrast');
    expect(issues[0].message).toContain('1.4.11');
    expect(issues[0].severity).toBe('warning');
  });

  it('passes a clearly visible dark border', () => {
    const issues = nonTextContrastToValidationIssues([
      { ...base, hasVisibleBorder: true, borderColor: 'rgb(20, 20, 20)' },
    ]);
    expect(issues).toEqual([]);
  });

  it('flags a filled control whose fill barely differs from the page', () => {
    const issues = nonTextContrastToValidationIssues([
      { ...base, ownBackground: 'rgb(248, 248, 248)' },
    ]);
    expect(issues).toHaveLength(1);
    expect(issues[0].message).toContain('Fill');
  });

  it('passes a filled control with a clearly distinct fill', () => {
    const issues = nonTextContrastToValidationIssues([
      { ...base, ownBackground: 'rgb(20, 90, 200)' },
    ]);
    expect(issues).toEqual([]);
  });

  it('skips a borderless, transparent (text-only) control — covered by 1.4.3', () => {
    expect(nonTextContrastToValidationIssues([base])).toEqual([]);
  });

  it('skips disabled controls (state treatment, not a boundary defect)', () => {
    const issues = nonTextContrastToValidationIssues([
      {
        ...base,
        disabled: true,
        hasVisibleBorder: true,
        borderColor: 'rgb(235, 235, 235)',
      },
    ]);
    expect(issues).toEqual([]);
  });

  it('skips when the backdrop is an image/gradient (indeterminate)', () => {
    const issues = nonTextContrastToValidationIssues([
      {
        ...base,
        backdropHasImage: true,
        hasVisibleBorder: true,
        borderColor: 'rgb(235, 235, 235)',
      },
    ]);
    expect(issues).toEqual([]);
  });

  it('skips when no resolvable backdrop colour exists', () => {
    const issues = nonTextContrastToValidationIssues([
      {
        ...base,
        ancestorBackgrounds: ['rgba(0, 0, 0, 0)'],
        hasVisibleBorder: true,
        borderColor: 'rgb(235, 235, 235)',
      },
    ]);
    expect(issues).toEqual([]);
  });

  it('flattens through a translucent scrim to a genuinely opaque grandparent', () => {
    // Regression: the browser-side ancestor walk used to stop at the FIRST
    // non-fully-transparent layer (even a translucent one), so a real opaque
    // backdrop sitting beneath a translucent scrim/tint was never collected —
    // flattenBackground then saw no a>=1 layer and returned null
    // (indeterminate), silently skipping a genuine 1.4.11 violation. With
    // both layers collected (top: translucent scrim, bottom: opaque white),
    // the violation must be reported.
    const issues = nonTextContrastToValidationIssues([
      {
        ...base,
        ancestorBackgrounds: ['rgba(255, 255, 255, 0.5)', 'rgb(255, 255, 255)'],
        hasVisibleBorder: true,
        borderColor: 'rgb(235, 235, 235)',
      },
    ]);
    expect(issues).toHaveLength(1);
    expect(issues[0].message).toContain('1.4.11');
  });
});
