// Borders (from https://open-props.style/#borders)
// ---------------

const width = {
  none: 0,

  small: '1px',
  medium: '2px',
  large: '5px',
  xlarge: '10px',
  xxlarge: '25px',
} as const;

const radius = {
  none: 0,

  round: '1e5px',

  xsmall: '2px',
  small: '5px',
  medium: '1rem',
  large: '2rem',
  xlarge: '4rem',
  xxlarge: '8rem',
} as const;

export const border = {
  width,
  radius,
};
