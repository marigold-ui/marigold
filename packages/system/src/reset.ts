const base = {
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  minWidth: 0,
  fontSize: '100%',
  font: 'inherit',
  verticalAlign: 'baseline',
  WebkitTapHighlightColor: 'transparent',
};

// Content
// ---------------
const block = {
  display: 'block',
};

const list = {
  // empty
};

const table = {
  borderCollapse: 'collapse',
  borderSpacing: 0,
};

// Typography
// ---------------
const a = {
  textDecoration: 'none',
  touchAction: 'manipulation',
};

const quote = {
  quotes: 'none',
  selectors: {
    '&:before, &:after': {
      content: "''",
    },
  },
};

// Form Elements
// ---------------
const button = {
  display: 'block',
  appearance: 'none',
  background: 'transparent',
  textAlign: 'center',
  touchAction: 'manipulation',
};

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
};

const select = {
  display: 'block',
  appearance: 'none',
  selectors: {
    '&::-ms-expand': {
      display: 'none',
    },
  },
};

const textarea = {
  display: 'block',
  appearance: 'none',
};

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
} as any;
