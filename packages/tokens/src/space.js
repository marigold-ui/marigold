// Sizes (from https://open-props.style/#sizes)
// ---------------
const fixed = {
  none: 0,
  'small-1': '.25rem',
  'small-2': '.5rem',
  'small-3': '1rem',
  'medium-1': '1.25rem',
  'medium-2': '1.5rem',
  'medium-3': '1.75rem',
  'large-1': '2rem',
  'large-2': '3rem',
  'large-3': '4rem',
  'large-4': '5rem',
};
const fluid = {
  none: 0,
  'small-1': 'clamp(.5rem, 1vw, 1rem)',
  'medium-1': 'clamp(1rem, 2vw, 1.5rem)',
  'medium-2': 'clamp(1.5rem, 3vw, 2rem)',
  'large-1': 'clamp(2rem, 4vw, 3rem)',
  'large-2': 'clamp(4rem, 5vw, 5rem)',
  'large-3': 'clamp(5rem, 7vw, 7.5rem)',
};
export const space = {
  fixed,
  fluid,
};
//# sourceMappingURL=space.js.map
