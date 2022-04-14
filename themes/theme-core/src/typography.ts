export const text = {
  root: {
    fontFamily: 'body',
    fontSize: '0.813rem',
    lineHeight: 'medium',
    fontWeight: 'body',
  },
  span: {
    display: 'inline-block',
  },
  p: {
    display: 'inline-block',
    mt: 'none',
    mr: 'none',
    mb: 'xsmall',
    ':last-child': {
      marginBottom: 'small',
    },
  },
} as const;

export const typography = {
  fonts: {
    body: 'Inter',
    heading: 'Inter Black',
  },
  fontSizes: {
    xxsmall: '0.875rem',
    xsmall: '1rem',
    small: '1.125rem',
    medium: '1.25rem',
    large: '1.5rem',
    xlarge: '2rem',
  },
  fontWeights: {
    body: 400,
    heading: 900,
    bold: 700,
  },
  lineHeights: {
    xsmall: 1,
    small: 1.125,
    medium: 1.5,
    large: 2,
    xlarge: 2.5,
    xxlarge: 3,
  },
  text: {
    body: {
      ...text.root,
      ...text.span,
    },
  },
} as const;
