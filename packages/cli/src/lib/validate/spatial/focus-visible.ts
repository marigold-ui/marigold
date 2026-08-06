/**
 * WCAG 2.4.7 Focus Visible — focused-vs-unfocused comparison (pure, testable).
 *
 * ACT rule oj04fd defines visible focus as a difference between the focused and
 * unfocused rendering; this captures that as a style-fingerprint diff covering
 * outline/box-shadow/border/background and the pseudo-elements where react-aria
 * draws rings. A screenshot diff is the more exhaustive form (see ACT oj04fd
 * and US12229390B2) — prior art to cite, not claim.
 */

export type FocusStyleFingerprint = {
  outline: string;
  boxShadow: string;
  border: string;
  backgroundColor: string;
  color: string;
  before: string;
  after: string;
};

/**
 * True when the element's appearance changes between the unfocused and focused
 * state on any surface — i.e. a focus indicator is perceivable. False means the
 * two states are identical, which is a 2.4.7 failure.
 */
export const focusIndicatorChanged = (
  unfocused: FocusStyleFingerprint,
  focused: FocusStyleFingerprint
): boolean =>
  unfocused.outline !== focused.outline ||
  unfocused.boxShadow !== focused.boxShadow ||
  unfocused.border !== focused.border ||
  unfocused.backgroundColor !== focused.backgroundColor ||
  unfocused.color !== focused.color ||
  unfocused.before !== focused.before ||
  unfocused.after !== focused.after;
