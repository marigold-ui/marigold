import { describe, expect, it } from 'vitest';
import { keyboardA11yToValidationIssues } from './keyboard.js';
import type { KeyboardA11yData } from './keyboard.js';

const emptyData: KeyboardA11yData = {
  focusableElements: [],
  tabSequence: [],
  unreachableElements: [],
  arrowNavResults: [],
};

describe('keyboardA11yToValidationIssues', () => {
  it('returns empty for clean data', () => {
    const issues = keyboardA11yToValidationIssues(emptyData);
    expect(issues).toEqual([]);
  });

  it('returns empty when all elements are reachable with focus indicators', () => {
    const issues = keyboardA11yToValidationIssues({
      ...emptyData,
      tabSequence: [
        {
          index: 0,
          selector: 'input:nth-child(1)',
          component: 'TextField',
          role: 'textbox',
          rect: { x: 10, y: 10, width: 200, height: 40 },
          focusIndicatorVisible: true,
        },
        {
          index: 1,
          selector: 'button:nth-child(2)',
          component: 'Button',
          role: 'button',
          rect: { x: 10, y: 60, width: 100, height: 40 },
          focusIndicatorVisible: true,
        },
      ],
    });
    expect(issues).toEqual([]);
  });

  it('flags unreachable elements as errors', () => {
    const issues = keyboardA11yToValidationIssues({
      ...emptyData,
      unreachableElements: [
        {
          selector: 'button:nth-child(3)',
          component: 'Button',
          tagName: 'BUTTON',
          role: 'button',
          rect: { x: 10, y: 100, width: 100, height: 40 },
        },
      ],
    });
    expect(issues).toHaveLength(1);
    expect(issues[0].severity).toBe('error');
    expect(issues[0].source).toBe('keyboard-a11y');
    expect(issues[0].message).toContain('not reachable via Tab');
  });

  it('flags missing focus indicator as error', () => {
    const issues = keyboardA11yToValidationIssues({
      ...emptyData,
      tabSequence: [
        {
          index: 0,
          selector: 'a:nth-child(1)',
          component: 'Link',
          role: 'link',
          rect: { x: 10, y: 10, width: 80, height: 20 },
          focusIndicatorVisible: false,
        },
      ],
    });
    expect(issues).toHaveLength(1);
    expect(issues[0].severity).toBe('error');
    expect(issues[0].message).toContain('no visible focus indicator');
    expect(issues[0].message).toContain('WCAG 2.4.7');
  });

  it('flags illogical focus order as warning', () => {
    const issues = keyboardA11yToValidationIssues({
      ...emptyData,
      tabSequence: [
        {
          index: 0,
          selector: 'button:nth-child(1)',
          component: 'Button',
          role: 'button',
          rect: { x: 200, y: 200, width: 100, height: 40 },
          focusIndicatorVisible: true,
        },
        {
          index: 1,
          selector: 'input:nth-child(2)',
          component: 'TextField',
          role: 'textbox',
          rect: { x: 10, y: 10, width: 200, height: 40 },
          focusIndicatorVisible: true,
        },
      ],
    });
    expect(issues).toHaveLength(1);
    expect(issues[0].severity).toBe('warning');
    expect(issues[0].message).toContain('Focus order');
  });

  it('caps focus order warnings at 3', () => {
    const tabSequence = Array.from({ length: 10 }, (_, i) => ({
      index: i,
      selector: `el:nth-child(${i + 1})`,
      component: `El${i}`,
      role: 'button',
      rect: { x: 200 - i * 20, y: 200 - i * 30, width: 50, height: 30 },
      focusIndicatorVisible: true,
    }));

    const issues = keyboardA11yToValidationIssues({
      ...emptyData,
      tabSequence,
    });
    const orderWarnings = issues.filter(i => i.message.includes('Focus order'));
    expect(orderWarnings.length).toBeLessThanOrEqual(3);
  });

  it('ignores minor vertical differences in focus order', () => {
    const issues = keyboardA11yToValidationIssues({
      ...emptyData,
      tabSequence: [
        {
          index: 0,
          selector: 'button:nth-child(1)',
          component: 'Button',
          role: 'button',
          rect: { x: 10, y: 50, width: 100, height: 40 },
          focusIndicatorVisible: true,
        },
        {
          index: 1,
          selector: 'button:nth-child(2)',
          component: 'Button',
          role: 'button',
          rect: { x: 120, y: 45, width: 100, height: 40 },
          focusIndicatorVisible: true,
        },
      ],
    });
    expect(issues).toEqual([]);
  });

  it('flags arrow nav as broken when focus leaves group', () => {
    const issues = keyboardA11yToValidationIssues({
      ...emptyData,
      arrowNavResults: [
        {
          groupSelector: '[role="menu"]',
          role: 'menu',
          memberCount: 5,
          navigable: false,
        },
      ],
    });
    expect(issues).toHaveLength(1);
    expect(issues[0].severity).toBe('warning');
    expect(issues[0].source).toBe('keyboard-a11y');
    expect(issues[0].message).toContain('Arrow key navigation');
    expect(issues[0].message).toContain('menu');
    expect(issues[0].details?.memberCount).toBe(5);
  });

  it('does not flag working arrow nav within group', () => {
    const issues = keyboardA11yToValidationIssues({
      ...emptyData,
      arrowNavResults: [
        {
          groupSelector: '[role="listbox"]',
          role: 'listbox',
          memberCount: 6,
          navigable: true,
        },
      ],
    });
    const arrowIssues = issues.filter(i =>
      i.message.includes('Arrow key navigation')
    );
    expect(arrowIssues).toEqual([]);
  });
});
