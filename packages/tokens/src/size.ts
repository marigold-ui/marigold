// Sizes (from https://open-props.style/#sizes)
// ---------------

const fixed = {
  none: 0,

  'small-1': '.25rem',
  'small-2': '.5rem',
  'small-3': '1rem',
  'small-4': '1.25rem',
  'small-5': '1.5rem',
  'medium-1': '1.75rem',
  'medium-2': '2rem',
  'medium-3': '3rem',
  'medium-4': '4rem',
  'medium-5': '5rem',
  'large-1': '7.5rem',
  'large-2': '10rem',
  'large-3': '15rem',
  'large-4': '20rem',
  'large-5': '30rem',
} as const;

const fluid = {
  none: 0,

  'small-1': 'clamp(.5rem, 1vw, 1rem)',
  'small-2': 'clamp(1rem, 2vw, 1.5rem)',
  'small-3': 'clamp(1.5rem, 3vw, 2rem)',
  'medium-1': 'clamp(2rem, 4vw, 3rem)',
  'medium-2': 'clamp(4rem, 5vw, 5rem)',
  'medium-3': 'clamp(5rem, 7vw, 7.5rem)',
  'large-1': 'clamp(7.5rem, 10vw, 10rem)',
  'large-2': 'clamp(10rem, 20vw, 15rem)',
  'large-3': 'clamp(15rem, 30vw, 20rem)',
  'large-4': 'clamp(20rem, 40vw, 30rem)',
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
