// Sizes (from https://open-props.style/#sizes)
// ---------------

const fixed = {
  none: 0,

  tiny: '.25rem',
  xxsmall: '.5rem',
  xsmall: '1rem',
  small: '1.25rem',
  medium: '1.5rem',
  large: '1.75rem',
  xlarge: '2rem',
  xxlarge: '3rem',
  xxxlarge: '4rem',
  huge: '5rem',
  epic: '7.5rem',
  colossal: '10rem',
} as const;

const fluid = {
  none: 0,

  xsmall: 'clamp(.5rem, 1vw, 1rem)',
  small: 'clamp(1rem, 2vw, 1.5rem)',
  medium: 'clamp(1.5rem, 3vw, 2rem)',
  large: 'clamp(2rem, 4vw, 3rem)',
  xlarge: 'clamp(4rem, 5vw, 5rem)',
  xxlarge: 'clamp(5rem, 7vw, 7.5rem)',
  xxxlarge: 'clamp(7.5rem, 10vw, 10rem)',
  huge: 'clamp(10rem, 20vw, 15rem)',
  epic: 'clamp(15rem, 30vw, 20rem)',
  colossal: 'clamp(20rem, 40vw, 30rem)',
} as const;

const content = {
  small: '20ch',
  medium: '45ch',
  large: '60ch',
} as const;

const header = {
  small: '20ch',
  medium: '25ch',
  large: '35ch',
} as const;

export const size = {
  fixed,
  fluid,
  content,
  header,
};
