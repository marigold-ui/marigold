export const root = {
  html: {
    scrollBehavior: 'smooth',
    scrollPaddingTop: 'medium-1',
  },
  body: {
    bg: 'background.page',
    fontFamily: 'body',
    color: 'text.regular',
  },
  a: {
    color: 'text.regular',
  },
  pre: {
    fontFamily: 'mono',
    py: 'small-1',
    px: 'small-1',
    borderRadius: '10px',
    overflowX: 'auto',
    maxWidth: '100%',
  },
  'h2#table-of-contents': {
    display: 'none',
  },
  'h2#table-of-contents + ul': {
    fontFamily: 'headline',
    position: 'absolute',
    right: 'medium-1',
    listStyle: 'none',
    borderLeft: '1px solid',
  },
} as const;
