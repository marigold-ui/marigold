import { BaseTheme } from '@marigold/components';
import { colors } from './colors';

const text = {
  root: {
    fontFamily: 'body',
    fontSize: 1,
    lineHeight: 'body',
    fontWeight: 'body',
    color: 'text',
  },
  span: {
    display: 'inline-block',
  },
  p: {
    display: 'inline-block',
    margin: '0 0 8px',
    ':last-child': {
      marginBottom: '16px',
    },
  },
};
const button = {
  root: {
    position: 'relative',
    fontFamily: 'body',
    fontSize: 1,
    fontWeight: 400,
    border: 'none',
    borderRadius: '2px',
    display: 'inline-flex',
  },
  large: {
    lineHeight: '46px',
    paddingX: 5,
  },
  small: {
    lineHeight: '30px',
    paddingX: 3,
  },
  primary: {
    color: 'background',
    bg: 'primary',
    ':hover': {
      color: 'background',
      bg: colors.orange40,
      cursor: 'pointer',
    },
    ':disabled': {
      color: colors.gray40,
      bg: colors.gray20,
      cursor: 'not-allowed',
    },
  },
  secondary: {
    color: 'background',
    bg: 'secondary',
    ':hover': {
      color: 'background',
      bg: colors.gray60,
      cursor: 'pointer',
    },
    ':disabled': {
      color: colors.gray40,
      bg: colors.gray20,
      cursor: 'not-allowed',
    },
  },
  ghost: {
    color: 'secondary',
    ':hover': {
      color: 'secondary',
      outline: '1px solid',
      outlineColor: colors.gray70,
      bg: colors.gray30,
      cursor: 'pointer',
    },
    ':disabled': {
      color: colors.gray40,
      bg: colors.gray20,
      cursor: 'not-allowed',
      outline: 'none',
    },
  },
};

const theme: BaseTheme = {
  breakpoints: [768, 1200],
  space: [0, 4, 8, 16, 24, 32, 40, 48, 56, 64, 88],
  fonts: {
    body: 'Inter',
    heading: 'Inter Black',
  },
  fontSizes: ['0.875rem', '1rem', '1.125rem', '1.25rem', '1.5rem', '2rem'],
  fontWeights: {
    body: 400,
    heading: 900,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    ...colors,
    text: colors.gray70,
    background: colors.gray10,
    primary: colors.orange60,
    secondary: colors.gray70,
    muted: colors.gray50,
  },
  form: {
    input: {
      display: 'block',
      fontFamily: 'body',
      color: colors.gray70,
      outline: '1px solid',
      outlineColor: colors.gray40,
      padding: '0 8px',
      lineHeight: '32px',
      ':focus': {
        outline: '2px solid',
        outlineColor: colors.blue60,
      },
      ':disabled': {
        bg: colors.gray20,
        color: colors.gray40,
        cursor: 'not-allowed',
      },
    },
    label: {
      fontFamily: 'body',
      fontSize: 0,
      fontWeight: 'body',
      lineHeight: '1.5rem',
      color: 'text',
    },
    select: {
      display: 'block',
      width: '100%',
      padding: 2,
      appearance: 'none',
      fontSize: 'inherit',
      lineHeight: 'inherit',
      border: '1px solid',
      borderColor: colors.gray30,
      borderRadius: '2px',
      color: 'inherit',
      bg: 'transparent',
      ':hover': {
        cursor: 'pointer',
      },
      ':focus': {
        border: '2px solid',
        borderColor: colors.blue60,
      },
      ':disabled': {
        bg: colors.gray10,
        color: colors.gray30,
        cursor: 'not-allowed',
      },
    },
    textarea: {
      fontFamily: 'body',
      lineHeight: '24px',
      padding: '4px 8px',
      color: 'text',
      border: '1px solid',
      borderColor: colors.gray40,
      borderRadius: '2px',
      outline: 'none',
      ':focus': {
        border: '2px solid',
        borderColor: colors.blue60,
      },
      ':disabled': {
        bg: colors.gray20,
        color: colors.gray40,
      },
    },
  },
  text: {
    body: {
      ...text.root,
      ...text.span,
    },
    heading: {
      ...text.root,
      ...text.p,
    },
  },
  button: {
    primary: {
      small: {
        ...button.root,
        ...button.primary,
        ...button.small,
      },
      large: {
        ...button.root,
        ...button.primary,
        ...button.large,
      },
    },
    secondary: {
      small: {
        ...button.root,
        ...button.secondary,
        ...button.small,
      },
      large: {
        ...button.root,
        ...button.secondary,
        ...button.large,
      },
    },
    ghost: {
      small: {
        ...button.root,
        ...button.ghost,
        ...button.small,
      },
      large: {
        ...button.root,
        ...button.ghost,
        ...button.large,
      },
    },
  },
  icon: {
    icon: {
      marginRight: 1,
    },
  },
  link: {
    normal: {
      color: colors.blue60,
      ':hover': {
        textDecoration: 'none',
      },
    },
    bold: {
      color: colors.blue60,
      fontWeight: 700,
      ':hover': {
        textDecoration: 'none',
      },
    },
    nav: {
      color: 'inherit',
      textDecoration: 'none',
    },
  },
};

export default theme;
