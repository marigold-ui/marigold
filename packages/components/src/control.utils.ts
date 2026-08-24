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

/**
 * Vertical centre of the *first* line box of a label block.
 *
 * All three controls anchor to line one, so this is the number they have to
 * meet whether the label is one line or five. Derived from the block's own
 * line-height rather than from a `Range`: range rects are the glyph box
 * (ascent + descent) and sit ~0.5px off the line box, which is the same order
 * as the misalignment being guarded against. The block carries no padding or
 * border, so its top *is* the top of line one.
 */
export const firstLineCenterY = (labelBlock: Element) => {
  const lineHeight = parseFloat(getComputedStyle(labelBlock).lineHeight);

  // A `normal` line-height parses to NaN, and every comparison against NaN is
  // false -- so an `expect(...).toBeLessThan()` on the offset would pass no
  // matter where the control sat. Fail here instead.
  expect(lineHeight).toBeGreaterThan(0);

  return labelBlock.getBoundingClientRect().top + lineHeight / 2;
};

/**
 * How far the control's optical centre misses the centre of the label's first
 * line, in px. Zero is the contract; sub-pixel rounding is why the assertions
 * allow half a pixel rather than an exact match.
 */
export const firstLineOffset = (control: Element, labelBlock: Element) =>
  Math.abs(centerY(control) - firstLineCenterY(labelBlock));

/**
 * Whether a label block is still exactly one line tall. A decoration that fits
 * the line leaves this true; one that inflates it -- the DST-1607 bug -- does
 * not, and that is what pushes the control off centre.
 */
export const isSingleLine = (labelBlock: Element) => {
  const lineHeight = parseFloat(getComputedStyle(labelBlock).lineHeight);

  return labelBlock.getBoundingClientRect().height === lineHeight;
};
