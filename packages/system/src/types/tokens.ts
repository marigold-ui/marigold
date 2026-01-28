/**
 * Semantic spacing tokens that describe the strength of the relationship between elements.
 *
 * The tighter the space, the stronger the relationship. These tokens follow a relational
 * scale where naming reflects the cognitive connection between objects rather than
 * arbitrary pixel values, allowing interfaces to adapt gracefully across different
 * contexts and density settings.
 */
export type SpacingTokens =
  | 'joined'
  | 'tight'
  | 'related'
  | 'peer'
  | 'group'
  | 'section'
  | 'context';
