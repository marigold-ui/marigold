/**
 * Shared reads for the boolean controls' story tests (Checkbox, Radio, Switch).
 *
 * The element that actually paints a control carries no accessible role, so
 * every hover/focus assertion has to reach it through the DOM. Kept in one
 * place so the three suites cannot drift apart on how they find it.
 *
 * Browser-only (computed styles), and kept out of `index.ts` -- internal test
 * tooling, like `contrast.utils.ts`.
 */
import { expect } from 'storybook/test';

/**
 * The `aria-hidden` box inside the label that paints a Checkbox or Radio.
 */
export const controlIcon = (control: HTMLElement) => {
  const icon = control.closest('label')?.querySelector('[aria-hidden="true"]');

  expect(icon).not.toBeNull();

  return icon!;
};

export const borderOf = (el: Element) => getComputedStyle(el).borderColor;
