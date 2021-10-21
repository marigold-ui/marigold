import { ElementType } from 'react';

const base = {
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  minWidth: 0,
  fontSize: '100%',
  fontFamily: 'inherit',
  verticalAlign: 'baseline',
  WebkitTapHighlightColor: 'transparent',
} as const;

// Content
// ---------------
const block = {
  display: 'block',
} as const;

const list = {
  // empty
} as const;

const table = {
  borderCollapse: 'collapse',
  borderSpacing: 0,
} as const;

// Typography
// ---------------
const a = {
  textDecoration: 'none',
  touchAction: 'manipulation',
} as const;

const quote = {
  quotes: 'none',
  selectors: {
    '&:before, &:after': {
      content: "''",
    },
  },
} as const;

// Form Elements
// ---------------
const button = {
  display: 'block',
  appearance: 'none',
  background: 'transparent',
  textAlign: 'center',
  touchAction: 'manipulation',
} as const;

const input = {
  display: 'block',
  appearance: 'none',
  selectors: {
    '&::-ms-clear': {
      display: 'none',
    },
    '&::-webkit-search-cancel-button': {
      WebkitAppearance: 'none',
    },
  },
} as const;

const select = {
  display: 'block',
  appearance: 'none',
  selectors: {
    '&::-ms-expand': {
      display: 'none',
    },
  },
} as const;

const textarea = {
  display: 'block',
  appearance: 'none',
} as const;

// Reset
// ---------------
const reset = {
  article: block,
  aside: block,
  details: block,
  figcaption: block,
  figure: block,
  footer: block,
  header: block,
  hgroup: block,
  menu: block,
  nav: block,
  section: block,
  ul: list,
  ol: list,
  blockquote: quote,
  q: quote,
  a,
  base,
  table,
  select,
  button,
  textarea,
  input,
} as const;

export type ResetElement = keyof typeof reset;
const isKnownElement = (input: string): input is ResetElement => input in reset;

/**
 * Helper to conveniently get reset styles.
 */
export const getResetStyles = (input?: ElementType): object => {
  /**
   * If a React component is given, we don't apply any reset styles
   * and return the base reset.
   */
  if (typeof input !== 'string') {
    return reset.base;
  }

  /**
   * Try to find the reset style for a HTML element. If the element
   * is not included return empty styles.
   */
  return isKnownElement(input) ? reset[input] : {};
};
