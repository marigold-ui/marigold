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
      marginBottom: 'medium',
      '&:first-child': {
        marginTop: 'none',
      },
    },
    headline2: {
      ...text.root,
      fontWeight: 'heading',
      fontSize: 'large',
      marginTop: 'medium',
      marginBottom: 'xsmall',
      '&:first-child': {
        marginTop: 'none',
      },
    },
    headline3: {
      ...text.root,
      fontWeight: 'heading',
      fontSize: 'medium',
      marginTop: 'small',
      marginBottom: 'small',
      '&:first-child': {
        marginTop: 'none',
      },
    },
    headline4: {
      ...text.root,
      fontWeight: 'heading',
      fontSize: 'small',
    },
    headline5: {
      ...text.root,
      fontWeight: 'heading',
      fontSize: 'xsmall',
    },
    headline6: {
      ...text.root,
      fontSize: 'xsmall',
      textTransform: 'uppercase',
    },
    link: {
      color: 'primary',
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
