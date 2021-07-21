import { css } from '@emotion/css';

const base = css({
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  minWidth: 0,
  fontSize: '100%',
  font: 'inherit',
  verticalAlign: 'baseline',
  WebkitTapHighlightColor: 'transparent',
});

// Content
// ---------------
const block = css({
  display: 'block',
});

const list = css({
  // empty
});

const table = css({
  borderCollapse: 'collapse',
  borderSpacing: 0,
});

// Typography
// ---------------
const a = css({
  textDecoration: 'none',
  touchAction: 'manipulation',
});

const quote = css({
  quotes: 'none',
  selectors: {
    '&:before, &:after': {
      content: "''",
    },
  },
});

// Form Elements
// ---------------
const button = css({
  display: 'block',
  appearance: 'none',
  background: 'transparent',
  textAlign: 'center',
  touchAction: 'manipulation',
});

const input = css({
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
});

const select = css({
  display: 'block',
  appearance: 'none',
  selectors: {
    '&::-ms-expand': {
      display: 'none',
    },
  },
});

const textarea = css({
  display: 'block',
  appearance: 'none',
});

// Reset
// ---------------
export const reset = {
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
