// Typography (from https://open-props.style/#typography)
// ---------------
const font = {
  sans: 'system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif',
  serif: 'ui-serif,serif',
  mono: 'Dank Mono,Operator Mono,Inconsolata,Fira Mono,ui-monospace,SF Mono,Monaco,Droid Sans Mono,Source Code Pro,monospace',
} as const;

const lineHeight = {
  'small-1': 0.95,
  'small-2': 1.1,
  'small-3': 1.25,
  'medium-1': 1.375,
  'medium-2': 1.5,
  'large-1': 1.75,
  'large-2': 2,
} as const;

const letterSpacing = {
  none: 'normal',

  'small-1': '-.05em',
  'small-2': '.025em',
  'small-3': '.050em',
  'medium-1': '.075em',
  'medium-2': '.150em',
  'medium-3': '.500em',
  'large-1': '.750em',
  'large-2': '1em',
} as const;

const fixed = {
  'small-1': '.5rem',
  'small-2': '.75rem',
  'small-3': '1rem',
  'medium-1': '1.1rem',
  'medium-2': '1.25rem',
  'medium-3': '1.5rem',
  'medium-4': '2rem',
  'large-1': '2.5rem',
  'large-2': '3rem',
  'large-3': '3.5rem',
} as const;

const fluid = {
  'small-1': 'clamp(.75rem, 2vw, 1rem)',
  'medium-1': 'clamp(1rem, 4vw, 1.5rem)',
  'medium-2': 'clamp(1.5rem, 6vw, 2.5rem)',
  'large-1': 'clamp(2rem, 9vw, 3.5rem)',
} as const;

const weight = {
  thin: 200,
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
  heavy: 900,
} as const;

export const typography = {
  font,
  lineHeight,
  letterSpacing,
  weight,
  size: {
    fixed,
    fluid,
  },
} as const;
