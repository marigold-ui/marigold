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

/**
 * Vertical centre of an element's border box, in viewport px.
 */
export const centerY = (el: Element) => {
  const { top, height } = el.getBoundingClientRect();

  return top + height / 2;
};

export const firstLineCenterY = (labelBlock: Element) => {
  const lineHeight = parseFloat(getComputedStyle(labelBlock).lineHeight);

  expect(lineHeight).toBeGreaterThan(0);

  return labelBlock.getBoundingClientRect().top + lineHeight / 2;
};

export const firstLineOffset = (control: Element, labelBlock: Element) =>
  Math.abs(centerY(control) - firstLineCenterY(labelBlock));

const SUBPIXEL_TOLERANCE = 0.5;

export const isSingleLine = (labelBlock: Element) => {
  const lineHeight = parseFloat(getComputedStyle(labelBlock).lineHeight);

  return (
    Math.abs(labelBlock.getBoundingClientRect().height - lineHeight) <=
    SUBPIXEL_TOLERANCE
  );
};
