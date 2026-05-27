import type { Page } from 'playwright';
import type { ValidationIssue } from '../types.js';

type FocusableElement = {
  selector: string;
  component: string;
  tagName: string;
  role: string;
  rect: { x: number; y: number; width: number; height: number };
  groupParent?: string;
};

type FocusStep = {
  index: number;
  selector: string;
  component: string;
  role: string;
  rect: { x: number; y: number; width: number; height: number };
  focusIndicatorVisible: boolean;
};

export type KeyboardA11yData = {
  focusableElements: FocusableElement[];
  tabSequence: FocusStep[];
  unreachableElements: FocusableElement[];
};

const INTERACTIVE_SELECTOR = [
  'button:not([disabled])',
  'a[href]',
  'input:not([type="hidden"]):not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex="0"]',
  '[role="button"]:not([disabled])',
  '[role="link"]',
  '[role="checkbox"]:not([disabled])',
  '[role="radio"]:not([disabled])',
  '[role="tab"]',
  '[role="menuitem"]',
  '[role="switch"]:not([disabled])',
  '[role="slider"]',
].join(', ');

const MAX_FOCUS_ORDER_WARNINGS = 3;

export const extractFocusableElements = async (
  page: Page
): Promise<FocusableElement[]> =>
  page.evaluate((selector: string) => {
    const w = window as Window & { __cssPath?: (el: Element) => string };
    const cssPath = w.__cssPath!;

    const elements: FocusableElement[] = [];
    for (const el of document.querySelectorAll(selector)) {
      const style = window.getComputedStyle(el);
      if (
        style.display === 'none' ||
        style.visibility === 'hidden' ||
        el.getAttribute('aria-hidden') === 'true'
      )
        continue;
      const htmlEl = el as HTMLElement;
      if (!htmlEl.offsetParent && el.tagName !== 'BODY') {
        const pos = window.getComputedStyle(el).position;
        if (pos !== 'fixed' && pos !== 'sticky') continue;
      }

      const rect = el.getBoundingClientRect();
      const component =
        el.getAttribute('data-component') ??
        el.getAttribute('data-slot') ??
        el.tagName.toLowerCase();

      let groupParent: string | undefined;
      let parent = el.parentElement;
      while (parent) {
        const role = parent.getAttribute('role');
        if (
          role === 'radiogroup' ||
          role === 'tablist' ||
          role === 'menu' ||
          role === 'menubar' ||
          role === 'listbox' ||
          role === 'tree'
        ) {
          groupParent = cssPath(parent);
          break;
        }
        parent = parent.parentElement;
      }

      elements.push({
        selector: cssPath(el),
        component,
        tagName: el.tagName,
        role: el.getAttribute('role') ?? el.tagName.toLowerCase(),
        rect: {
          x: Math.round(rect.x),
          y: Math.round(rect.y),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        },
        groupParent,
      });
    }
    return elements;
  }, INTERACTIVE_SELECTOR);

const extractFocusStepData = async (
  page: Page
): Promise<{
  selector: string;
  component: string;
  role: string;
  rect: { x: number; y: number; width: number; height: number };
  focusIndicatorVisible: boolean;
  isBody: boolean;
}> =>
  page.evaluate(() => {
    const w = window as Window & { __cssPath?: (el: Element) => string };
    const cssPath = w.__cssPath!;
    const el = document.activeElement;

    if (!el || el === document.body) {
      return {
        selector: 'body',
        component: 'body',
        role: '',
        rect: { x: 0, y: 0, width: 0, height: 0 },
        focusIndicatorVisible: false,
        isBody: true,
      };
    }

    const style = window.getComputedStyle(el);
    const outlineVisible =
      style.outlineStyle !== 'none' &&
      parseFloat(style.outlineWidth) > 0 &&
      style.outlineColor !== 'transparent';
    const boxShadowVisible =
      style.boxShadow !== 'none' && style.boxShadow !== '';

    const rect = el.getBoundingClientRect();

    return {
      selector: cssPath(el),
      component:
        el.getAttribute('data-component') ??
        el.getAttribute('data-slot') ??
        el.tagName.toLowerCase(),
      role: el.getAttribute('role') ?? el.tagName.toLowerCase(),
      rect: {
        x: Math.round(rect.x),
        y: Math.round(rect.y),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      },
      focusIndicatorVisible: outlineVisible || boxShadowVisible,
      isBody: false,
    };
  });

export const extractTabSequence = async (
  page: Page,
  maxSteps: number
): Promise<{ tabSequence: FocusStep[] }> => {
  await page.evaluate(() => {
    const active = document.activeElement;
    if (active instanceof HTMLElement) active.blur();
    document.body.focus();
  });

  const tabSequence: FocusStep[] = [];
  const visited = new Set<string>();

  for (let i = 0; i < maxSteps; i++) {
    await page.keyboard.press('Tab');
    const step = await extractFocusStepData(page);

    if (step.isBody) break;
    if (visited.has(step.selector)) break;

    visited.add(step.selector);
    tabSequence.push({
      index: i,
      selector: step.selector,
      component: step.component,
      role: step.role,
      rect: step.rect,
      focusIndicatorVisible: step.focusIndicatorVisible,
    });
  }

  return { tabSequence };
};

export const extractKeyboardA11yData = async (
  page: Page
): Promise<KeyboardA11yData> => {
  const focusableElements = await extractFocusableElements(page);
  const maxSteps = focusableElements.length * 2 + 5;
  const { tabSequence } = await extractTabSequence(page, maxSteps);

  const reachedSelectors = new Set(tabSequence.map(s => s.selector));

  const reachedGroups = new Set<string>();
  for (const el of focusableElements) {
    if (el.groupParent && reachedSelectors.has(el.selector)) {
      reachedGroups.add(el.groupParent);
    }
  }

  const unreachableElements = focusableElements.filter(el => {
    if (reachedSelectors.has(el.selector)) return false;
    if (el.groupParent && reachedGroups.has(el.groupParent)) return false;
    return true;
  });

  return { focusableElements, tabSequence, unreachableElements };
};

const VERTICAL_THRESHOLD = 20;

export const keyboardA11yToValidationIssues = (
  data: KeyboardA11yData
): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];

  for (const el of data.unreachableElements) {
    issues.push({
      type: 'a11y',
      severity: 'error',
      source: 'keyboard-a11y',
      component: el.component,
      message: `Interactive element <${el.component}> (${el.role}) is not reachable via Tab key.`,
      suggestion:
        'Ensure the element is focusable. Marigold interactive components are focusable by default — check if a parent has tabindex="-1" or focus is trapped.',
      details: { selector: el.selector, role: el.role },
    });
  }

  let focusOrderWarnings = 0;
  for (
    let i = 1;
    i < data.tabSequence.length &&
    focusOrderWarnings < MAX_FOCUS_ORDER_WARNINGS;
    i++
  ) {
    const prev = data.tabSequence[i - 1];
    const curr = data.tabSequence[i];
    if (
      curr.rect.y < prev.rect.y - VERTICAL_THRESHOLD &&
      curr.rect.x < prev.rect.x
    ) {
      focusOrderWarnings++;
      issues.push({
        type: 'a11y',
        severity: 'warning',
        source: 'keyboard-a11y',
        component: curr.component,
        message: `Focus order may not be logical: Tab moved from <${prev.component}> at (${prev.rect.x}, ${prev.rect.y}) to <${curr.component}> at (${curr.rect.x}, ${curr.rect.y}).`,
        suggestion:
          'Check the DOM order. Prefer natural DOM order for focus sequence rather than positive tabindex values.',
        details: {
          from: { component: prev.component, x: prev.rect.x, y: prev.rect.y },
          to: { component: curr.component, x: curr.rect.x, y: curr.rect.y },
        },
      });
    }
  }

  for (const step of data.tabSequence) {
    if (!step.focusIndicatorVisible) {
      issues.push({
        type: 'a11y',
        severity: 'error',
        source: 'keyboard-a11y',
        component: step.component,
        message: `Element <${step.component}> has no visible focus indicator when focused (WCAG 2.4.7).`,
        suggestion:
          'Marigold components provide built-in focus rings via the theme. For custom elements, add an outline or box-shadow on :focus-visible.',
        details: { selector: step.selector, role: step.role },
      });
    }
  }

  return issues;
};
