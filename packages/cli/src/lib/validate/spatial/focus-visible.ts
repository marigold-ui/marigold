/**
 * WCAG 2.4.7 Focus Visible — focused-vs-unfocused comparison (pure, testable).
 *
 * The older check only asked "does the focused element have an outline or
 * box-shadow?", which a permanently-shadowed element passes even though nothing
 * changes on focus. ACT rule oj04fd defines visible focus as a difference
 * between the focused and unfocused rendering; this captures that as a
 * style-fingerprint diff. (A screenshot diff is the more exhaustive form; the
 * style fingerprint covers outline/box-shadow/border/background and the
 * ::before/::after pseudo-elements where react-aria/Marigold draw rings.)
 *
 * Nearest prior art to cite, not claim: ACT oj04fd defines the pixel diff; a USC
 * patent (US12229390B2, Chiou/Halfond) describes a screenshot-based variant.
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
