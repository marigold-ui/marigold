/**
 * The glide of a selection indicator moving to a new item, shared by Tabs and
 * Stepper so both move with the same feel. Matches the theme's
 * `--ease-out-quart` token, which CSS transitions use for the same curve.
 */
export const INDICATOR_TRANSITION = {
  duration: 0.25,
  ease: [0.165, 0.84, 0.44, 1] as const,
};
