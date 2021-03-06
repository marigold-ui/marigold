const text = {
  root: {
    fontFamily: 'body',
    fontSize: 'body',
    lineHeight: 'body',
    fontWeight: 'body',
  },
};

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
    cap: 1,
    body: 1.5,
    heading: 1.125,
  },
  text: {
    body: {
      ...text.root,
    },
    h1: {
      ...text.root,
      fontWeight: 'heading',
      fontSize: 'xlarge',
      marginBottom: 'medium',
      '&:first-child': {
        marginTop: 'none',
      },
    },
    h2: {
      ...text.root,
      fontWeight: 'heading',
      fontSize: 'large',
      marginTop: 'large',
      marginBottom: 'xsmall',
      '&:first-child': {
        marginTop: 'none',
      },
    },
    h3: {
      ...text.root,
      fontWeight: 'heading',
      fontSize: 'medium',
      marginTop: 'small',
      marginBottom: 'xsmall',
      '&:first-child': {
        marginTop: 'none',
      },
    },
    h4: {
      ...text.root,
      fontWeight: 'heading',
      fontSize: 'small',
    },
    h5: {
      ...text.root,
      fontWeight: 'heading',
      fontSize: 'xsmall',
    },
    h6: {
      ...text.root,
      fontSize: 'xsmall',
      textTransform: 'uppercase',
    },
    link: {
      color: 'primary',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
};
