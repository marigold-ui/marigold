export const text = {
  root: {
    fontFamily: 'body',
    fontSize: 'xsmall',
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
    body: 'Arial',
    heading: 'Roboto',
  },
  fontSizes: {
    xxsmall: '0.66rem',
    xsmall: '1rem',
    small: '1.33rem',
    medium: '1.66rem',
    large: '2rem',
    xlarge: '2.33rem',
  },
  fontWeights: {
    body: 300,
    heading: 800,
    bold: 600,
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
