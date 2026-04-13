/**
 * Semantic spacing tokens that describe the strength of the relationship between elements.
 *
 * The tighter the space, the stronger the relationship. These tokens follow a relational
 * scale where naming reflects the cognitive connection between objects rather than
 * arbitrary pixel values, allowing interfaces to adapt gracefully across different
 * contexts and density settings.
 */
export type SpacingTokens =
  | 'tight'
  | 'related'
  | 'regular'
  | 'group'
  | 'section';

/**
 * Padding spacing tokens for single-axis padding (e.g. `spaceX`, `spaceY`).
 *
 * Single-value tokens that can be composed to create symmetric or
 * asymmetric padding on any component.
 *
 * Five density levels: tight, snug, regular, relaxed, loose.
 */
export type PaddingSpacingTokens =
  | 'padding-tight'
  | 'padding-snug'
  | 'padding-regular'
  | 'padding-relaxed'
  | 'padding-loose';

/**
 * Inset spacing recipe tokens for the `space` prop on Inset.
 *
 * Multi-value tokens that set padding on all sides at once:
 * - `square-*`: Equal padding on all sides
 * - `squish-*`: More horizontal than vertical padding
 * - `stretch-*`: More vertical than horizontal padding
 *
 * Each category has five density levels: tight, snug, regular, relaxed, loose.
 */
export type InsetSpacingTokens =
  | 'square-tight'
  | 'square-snug'
  | 'square-regular'
  | 'square-relaxed'
  | 'square-loose'
  | 'squish-tight'
  | 'squish-snug'
  | 'squish-regular'
  | 'squish-relaxed'
  | 'squish-loose'
  | 'stretch-tight'
  | 'stretch-snug'
  | 'stretch-regular'
  | 'stretch-relaxed'
  | 'stretch-loose';
