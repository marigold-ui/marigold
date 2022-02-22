// Typography (from https://open-props.style/#typography)
// ---------------
const font = {
  sans: 'system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif',
  serif: 'ui-serif,serif',
  mono: 'Dank Mono,Operator Mono,Inconsolata,Fira Mono,ui-monospace,SF Mono,Monaco,Droid Sans Mono,Source Code Pro,monospace',
} as const;

const lineHeight = {
  '00': 0.95,
  '0': 1.1,
  '1': 1.25,
  '2': 1.375,
  '3': 1.5,
  '4': 1.75,
  '5': 2,
};

export const typography = {
  font,
  lineHeight,
};
