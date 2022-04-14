const text = {
  root: {
    fontFamily: 'body',
    fontSize: 'body',
    lineHeight: 'medium',
    fontWeight: 'body',
  },
  heading: {
    fontWeight: 'heading',
    color: 'gray.20',
  },
} as const;

export const typography = {
  fonts: {
    body: 'Inter',
    heading: 'Inter Black',
    code: 'monospace',
  },
  fontSizes: {
    body: '1rem',
    xxxsmall: '0.75rem',
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
    medium: 600,
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
      color: 'gray.40',
      marginBottom: 'medium',
    },
    muted: {
      ...text.root,
      color: 'gray.60',
    },
  },
} as const;
