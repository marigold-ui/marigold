// Borders (from https://open-props.style/#borders)
// ---------------

const width = {
  none: 0,

  'small-1': '1px',
  'medium-1': '2px',
  'large-1': '5px',
  'large-2': '10px',
  'large-3': '25px',
} as const;

const radius = {
  none: 0,

  round: '1e5px',

  'small-1': '2px',
  'small-2': '5px',
  'medium-1': '1rem',
  'medium-2': '2rem',
  'large-1': '4rem',
  'large-2': '8rem',
} as const;

export const border = {
  width,
  radius,
};
