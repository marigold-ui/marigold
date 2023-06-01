export const root = {
  html: {
    scrollBehavior: 'smooth',
    scrollPaddingTop: 'medium-1',
  },
  body: {
    bg: 'background.page',
    fontFamily: 'body',
    fontSize: 'fixed.medium-1',
    color: 'text.regular',
  },
  a: {
    color: 'text.regular',
  },
  pre: {
    fontFamily: 'mono',
    fontSize: 'fixed.small-3',
    py: 'small-1',
    px: 'small-1',
    borderRadius: '10px',
    overflowX: 'auto',
    maxWidth: '100%',
    maxHeight: '500px',
  },
} as const;
