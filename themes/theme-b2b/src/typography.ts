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
    headline1: {
      ...text.root,
      fontWeight: 'heading',
      fontSize: 'xlarge',
      m: 'none',
    },
    headline2: {
      ...text.root,
      fontWeight: 'heading',
      fontSize: 'large',
      m: 'none',
    },
    headline3: {
      ...text.root,
      fontWeight: 'heading',
      fontSize: 'medium',
      m: 'none',
    },
    headline4: {
      ...text.root,
      fontWeight: 'heading',
      fontSize: 'small',
      m: 'none',
    },
    headline5: {
      ...text.root,
      fontWeight: 'heading',
      fontSize: 'xsmall',
      m: 'none',
    },
    headline6: {
      ...text.root,
      fontSize: 'xsmall',
      textTransform: 'uppercase',
      m: 'none',
    },
    link: {
      color: 'blue60',
      ':hover': {
        textDecoration: 'none',
      },
    },
    menuItemLink: {
      color: 'text',
      textDecoration: 'none',
    },
  },
} as const;
