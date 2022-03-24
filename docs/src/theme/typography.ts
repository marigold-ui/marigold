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
    outlineLink: {
      display: 'inline-flex',
      alignItems: 'center',
      columnGap: 10,
      borderRadius: 'medium',
      border: 'solid',
      lineHeight: 1,
      color: 'gray.20',
      textDecoration: 'none',
      py: 'xsmall',
      px: 'medium',
      ':hover': {
        bg: 'gray.90',
      },
    },
    body: {
      ...text.root,
      color: 'gray.40',
      marginBottom: 'medium',
    },
    headline1: {
      ...text.root,
      ...text.heading,
      fontSize: 'xlarge',
      marginBottom: 'medium',
      '&:first-of-type': {
        marginTop: 'none',
      },
    },
    headline2: {
      ...text.root,
      ...text.heading,
      fontSize: 'large',
      marginTop: 'large',
      marginBottom: 'xsmall',
      '&:first-of-type': {
        marginTop: 'none',
      },
    },
    headline3: {
      ...text.root,
      ...text.heading,
      fontSize: 'medium',
      marginTop: 'small',
      marginBottom: 'xsmall',
      '&:first-of-type': {
        marginTop: 'none',
      },
    },
    headline4: {
      ...text.root,
      ...text.heading,
      fontSize: 'small',
    },
    headline5: {
      ...text.root,
      ...text.heading,
      fontSize: 'xsmall',
    },
    headline6: {
      ...text.root,
      fontSize: 'xsmall',
      textTransform: 'uppercase',
    },
    muted: {
      ...text.root,
      color: 'gray.60',
    },
  },
} as const;
