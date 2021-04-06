import { BaseTheme } from '@marigold/components';
import { colors } from './colors';

const text = {
  root: {
    fontFamily: 'body',
    fontSize: 1,
    lineHeight: 'body',
    fontWeight: 'body',
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
    fontWeight: 'body',
    border: 'none',
    borderRadius: '8px',
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
    border: '1px solid',
    outlineColor: colors.gray70,
    ':hover': {
      color: 'secondary',
      bg: colors.gray30,
      cursor: 'pointer',
    },
    ':disabled': {
      color: 'disabled',
      bg: colors.gray00,
      outlineColor: 'disabled',
      cursor: 'not-allowed',
    },
  },
  text: {
    color: 'secondary',
    ':hover': {
      color: 'secondary',
      outlineColor: colors.gray70,
      bg: colors.gray30,
      cursor: 'pointer',
    },
    ':disabled': {
      color: 'disabled',
      bg: colors.gray00,
      cursor: 'not-allowed',
      outline: 'none',
    },
  },
  menu: {
    color: 'secondary',
    bg: 'background',
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
};

const theme: BaseTheme = {
  breakpoints: [768, 1200],
  space: [0, 4, 8, 16, 24, 32, 40, 48, 56, 64, 88],
  fonts: {
    body: 'Arial',
    heading: 'Roboto',
  },
  fontSizes: ['0.66rem', '1rem', '1.33rem', '1.66rem', '2rem', '2.33rem'],
  fontWeights: {
    body: 300,
    heading: 800,
    bold: 600,
  },
  lineHeights: {
    body: 2,
    heading: 1.5,
  },
  colors: {
    ...colors,
    text: '#070708',
    background: '#fdfcfd',
    primary: '#c9b1ff',
    secondary: '#ffcaf2',
    disabled: '#e9e7eb',
    error: '#ffb2b1',
    warning: '#fff3ad',
    info: '#a2edff',
    success: '#bcffbc',
  },
  checkbox: {
    default: {
      color: 'primary',
    },
  },
  input: {
    default: {
      display: 'block',
      fontFamily: 'body',
      color: 'text',
      border: 0,
      outline: '1px solid',
      outlineColor: colors.gray40,
      padding: '0 12px',
      lineHeight: '32px',
      ':focus': {
        outline: '2px solid',
        outlineColor: 'primary',
      },
      ':disabled': {
        bg: colors.gray20,
        color: colors.gray40,
        cursor: 'not-allowed',
      },
    },
  },
  field: {
    default: {
      fontFamily: 'body',
      fontSize: 1,
      color: 'text',
      fontWeight: 'body',
      lineHeight: '2rem',
    },
  },
  label: {
    default: {
      fontFamily: 'body',
      fontSize: 1,
      fontWeight: 'body',
      lineHeight: '2rem',
      color: 'text',
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
    h1: {
      ...text.root,
      fontWeight: 'heading',
      fontSize: 5,
      marginBottom: '24px',
      '&:first-child': {
        marginTop: 0,
      },
    },
    h2: {
      ...text.root,
      fontWeight: 'heading',
      fontSize: 4,
      marginTop: '32px',
      marginBottom: '8px',
      '&:first-child': {
        marginTop: 0,
      },
    },
    h3: {
      ...text.root,
      fontWeight: 'heading',
      fontSize: 3,
      marginTop: '16px',
      marginBottom: '8px',
      '&:first-child': {
        marginTop: 0,
      },
    },
    h4: {
      ...text.root,
      fontWeight: 'heading',
      fontSize: 2,
    },
    h5: {
      ...text.root,
      fontWeight: 'heading',
      fontSize: 1,
    },
    h6: {
      ...text.root,
      fontSize: 1,
      textTransform: 'uppoercase',
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
    text: {
      root: {
        ...button.root,
        ...button.text,
      },
      small: {
        ...button.root,
        ...button.text,
        ...button.small,
      },
      large: {
        ...button.root,
        ...button.text,
        ...button.large,
      },
    },
    menu: {
      ...button.root,
      ...button.menu,
      ...button.small,
    },
  },
  link: {
    normal: {
      color: 'primary',
      ':hover': {
        textDecoration: 'none',
      },
    },
    menu: {
      color: 'text',
      textDecoration: 'none',
    },
  },
  alerts: {
    error: {
      borderStyle: 'solid',
      borderColor: 'error',
      borderWidth: '3px 3px 3px 0px',
    },
    warning: {
      borderStyle: 'solid',
      borderColor: 'warning',
      borderWidth: '3px 3px 3px 0px',
    },
    success: {
      borderStyle: 'solid',
      borderColor: 'success',
      borderWidth: '3px 3px 3px 0px',
    },
  },
  dialog: {
    wrapper: { display: 'block', borderRadius: '2px', pl: '32px', pb: '32px' },
    body: { pt: '16px' },
    onClose: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'start',
      pt: '8px',
      px: '8px',
    },
  },
  validation: {
    error: {
      ...text.root,
      fontSize: 1,
      textTransform: 'uppercase',
      color: 'error',
    },
  },
  divider: {
    regular: {
      m: 0,
      my: 3,
      border: 0,
      borderBottom: '1px solid',
    },
    bold: {
      m: 0,
      my: 3,
      border: 0,
      borderBottom: '3px solid',
    },
  },
  messages: {
    warning: {
      borderStyle: 'solid',
      borderColor: 'warning',
      borderWidth: '2px 2px 2px 16px',
      padding: '8px 16px 16px',
      color: 'warning',
    },
    error: {
      borderStyle: 'solid',
      borderColor: 'error',
      borderWidth: '2px 2px 2px 16px',
      padding: '8px 16px 16px',
      color: 'error',
    },
    info: {
      borderStyle: 'solid',
      borderColor: 'info',
      borderWidth: '2px 2px 2px 16px',
      padding: '8px 16px 16px',
      color: 'info',
    },
    title: {
      mb: '16px',
    },
  },
  images: {
    fullWidth: {
      maxWidth: '100%',
      height: 'auto',
    },
  },
  badge: {
    default: {
      display: 'inline-flex',
      alignItems: 'center',
      fontFamily: 'body',
      fontSize: 1,
      fontWeight: 'body',
      borderRadius: '10px',
      border: '2px solid transparent',
      whiteSpace: 'nowrap',
      padding: '0.25rem 0.75rem',
      mx: '0.5rem',
    },
  },
  menu: {
    menuItem: {
      display: 'block',
      fontFamily: 'body',
      fontSize: 1,
      fontWeight: 'body',
      padding: 2,
      bg: 'primary',
      color: 'text',
      ':hover': {
        bg: 'secondary',
        cursor: 'pointer',
      },
    },
  },
};

export default theme;
