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

const block = {
  display: 'block',
};

const body = {
  lineHeight: 1,
};

const list = {
  listStyle: 'none',
};

const quote = {
  quotes: 'none',
  selectors: {
    '&:before, &:after': {
      content: "''",
    },
  },
};

const table = {
  borderCollapse: 'collapse',
  borderSpacing: 0,
};

const appearance = {
  appearance: 'none',
};

const field = [block, appearance];

const mark = {
  backgroundColor: 'transparent',
  color: 'inherit',
};

const select = [
  ...field,
  {
    selectors: {
      '&::-ms-expand': {
        display: 'none',
      },
    },
  },
];

const input = [
  ...field,
  {
    selectors: {
      '&::-ms-clear': {
        display: 'none',
      },
      '&::-webkit-search-cancel-button': {
        WebkitAppearance: 'none',
      },
    },
  },
];

const button = {
  background: 'none',
};

const a = {
  textDecoration: 'none',
};

export const el = {
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
  body,
  a,
  base,
  table,
  mark,
  select,
  p: list,
  button,
  textarea: field,
  input,
};
