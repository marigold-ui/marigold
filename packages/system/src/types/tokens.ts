/**
 * Universal "no spacing" token shared across all spacing families.
 *
 * Resolves to `0` and works anywhere a spacing token is accepted: relational
 * spacing (e.g. `Stack` gap), single-axis padding (`spaceX`/`spaceY`), and
 * inset recipes (`Inset` `space`). Useful when a wrapper should render without
 * adding any space — e.g. a Panel containing an edge-to-edge Table.
 */
export type NoSpacingToken = 'zero';

/**
 * Semantic spacing tokens that describe the strength of the relationship between elements.
 *
 * The tighter the space, the stronger the relationship. These tokens follow a relational
 * scale where naming reflects the cognitive connection between objects rather than
 * arbitrary pixel values, allowing interfaces to adapt gracefully across different
 * contexts and density settings.
 *
 * Includes the universal `zero` token for the no-spacing case.
 */
export type SpacingTokens =
  | NoSpacingToken
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
 * Five density levels: tight, snug, regular, relaxed, loose, plus the universal
 * `zero` token for the no-spacing case.
 */
export type PaddingSpacingTokens =
  | NoSpacingToken
  | 'padding-tight'
  | 'padding-snug'
  | 'padding-regular'
  | 'padding-relaxed'
  | 'padding-loose';

/**
 * Inset spacing recipe tokens for the `space` prop on Inset.
 *
 * Multi-value tokens that set padding on all sides at once:
 * - `zero`: No padding (equivalent to 0)
 * - `square-*`: Equal padding on all sides
 * - `squish-*`: More horizontal than vertical padding
 * - `stretch-*`: More vertical than horizontal padding
 *
 * Each `*-*` category has five density levels: tight, snug, regular, relaxed, loose.
 */
export type InsetSpacingTokens =
  | NoSpacingToken
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
