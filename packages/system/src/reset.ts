const base = {
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  minWidth: 0,
  fontSize: '100%',
  font: 'inherit',
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
