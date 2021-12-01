/**
 * Normalize stylinf of certain elements between browsers.
 * Based on https://www.joshwcomeau.com/css/custom-css-reset/
 */
import { ElementType } from 'react';

const base = {
  boxSizing: 'border-box',
  margin: 0,
  minWidth: 0,
} as const;

const a = {
  ...base,
  textDecoration: 'none',
} as const;

const text = {
  ...base,
  overflowWrap: 'break-word',
} as const;

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
} as const;

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
} as const;

const select = {
  ...base,
  display: 'block',
  appearance: 'none',
  font: 'inherit',
  '&::-ms-expand': {
    display: 'none',
  },
} as const;

const textarea = {
  ...base,
  display: 'block',
  appearance: 'none',
  font: 'inherit',
} as const;

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
} as const;

export type NormalizedElement = keyof typeof normalize;

/**
 * Type-safe helper to get normalization. If no normalization is found,
 * returns the *base* normalization.
 */
export const getNormalizedStyles = (val?: ElementType) =>
  typeof val === 'string' && val in normalize
    ? normalize[val as NormalizedElement] // Typescript doesn't infer this correctly
    : normalize.base;
