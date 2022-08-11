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
} as const;
