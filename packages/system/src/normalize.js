const base = {
  boxSizing: 'border-box',
  margin: 0,
  minWidth: 0,
};
const a = {
  ...base,
  textDecoration: 'none',
};
const text = {
  ...base,
  overflowWrap: 'break-word',
};
const media = {
  ...base,
  display: 'block',
  maxWidth: '100%',
};
const button = {
  ...base,
  display: 'block',
  appearance: 'none',
  font: 'inherit',
  background: 'transparent',
  textAlign: 'center',
};
const input = {
  ...base,
  display: 'block',
  appearance: 'none',
  font: 'inherit',
  '&::-ms-clear': {
    display: 'none',
  },
  '&::-webkit-search-cancel-button': {
    WebkitAppearance: 'none',
  },
};
const select = {
  ...base,
  display: 'block',
  appearance: 'none',
  font: 'inherit',
  '&::-ms-expand': {
    display: 'none',
  },
};
const textarea = {
  ...base,
  display: 'block',
  appearance: 'none',
  font: 'inherit',
};
// Normalize
// ---------------
export const normalize = {
  base,
  a,
  p: text,
  h1: text,
  h2: text,
  h3: text,
  h4: text,
  h5: text,
  h6: text,
  img: media,
  picture: media,
  video: media,
  canvas: media,
  svg: media,
  select,
  button,
  textarea,
  input,
};
/**
 * Type-safe helper to get normalization. If no normalization is found,
 * returns the *base* normalization.
 */
export const getNormalizedStyles = val =>
  typeof val === 'string' && val in normalize
    ? normalize[val] // Typescript doesn't infer this correctly
    : normalize.base;
//# sourceMappingURL=normalize.js.map
