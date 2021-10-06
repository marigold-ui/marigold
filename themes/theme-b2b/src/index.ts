import { BaseTheme } from '@marigold/components';
import { colors } from './colors';

const selectButton = {
  appearance: 'none',
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  overflow: 'hidden',
  outline: 'none',
  width: '100%',
  lineHeight: '32px',
  px: 'xsmall',
  color: 'inherit',
  bg: 'transparent',
};
const button = {
  root: {
    position: 'relative',
    fontFamily: 'body',
    fontSize: 'xsmall',
    fontWeight: 'body',
    border: 'none',
    borderRadius: '2px',
    display: 'inline-flex',
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
  select: {
    ...selectButton,
    border: '1px solid transparent',
    borderColor: colors.gray40,
    ':hover': {
      cursor: 'pointer',
    },
    ':focus': {
      boxShadow: '0 0 0 2px ' + colors.blue60,
      border: '1px solid transparent',
    },
    ':disabled': {
      bg: colors.gray20,
      color: 'disabled',
      cursor: 'not-allowed',
    },
    error: {
      ...selectButton,
      border: '1px solid',
      borderRadius: '2px',
      borderColor: 'error',
    },
    open: {
      ...selectButton,
      border: '1px solid transparent',
      borderTopColor: colors.gray40,
      borderLeftColor: colors.gray40,
      borderRightColor: colors.gray40,
      borderTopRightRadius: '2px',
      borderTopLeftRadius: '2px',
    },
    errorOpened: {
      ...selectButton,
      border: '1px solid transparent',
      borderTopColor: 'error',
      borderLeftColor: 'error',
      borderRightColor: 'error',
      borderTopRightRadius: '2px',
      borderTopLeftRadius: '2px',
    },
  },
  close: {
    color: 'text',
    bg: 'transparent',
    ':hover': {
      cursor: 'pointer',
    },
  },
};
const text = {
  root: {
    fontFamily: 'body',
    fontSize: 'xsmall',
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
      marginBottom: 'small',
    },
  },
};
const selectOption = {
  fontFamily: 'body',
  fontSize: 'xsmall',
  fontWeight: 'body',
  lineHeight: '32px',
  outline: 'none',
  cursor: 'pointer',
  color: 'text',
  px: 'xsmall',
  listStyle: 'none',
};

const theme: BaseTheme = {
  breakpoints: ['768', '1200'],
  space: {
    none: 0,
    xxsmall: 4,
    xsmall: 8,
    small: 16,
    medium: 24,
    large: 32,
    xlarge: 40,
    xxlarge: 48,
  },
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
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    ...colors,
    text: colors.gray70,
    background: colors.gray10,
    primary: colors.orange60,
    secondary: colors.gray70,
    disabled: colors.gray40,
    error: colors.red60,
    warning: colors.orange60,
    info: colors.blue70,
    success: colors.green70,
  },
  root: {
    body: {
      margin: 0,
      padding: 0,
      fontFamily: 'body',
    },
  },
  alerts: {
    error: {
      borderStyle: 'solid',
      borderColor: 'error',
      borderWidth: '2px 2px 2px 0px',
    },
    warning: {
      borderStyle: 'solid',
      borderColor: 'warning',
      borderWidth: '2px 2px 2px 0px',
    },
    success: {
      borderStyle: 'solid',
      borderColor: 'success',
      borderWidth: '2px 2px 2px 0px',
    },
  },
  badge: {
    default: {
      display: 'inline-flex',
      alignItems: 'center',
      fontFamily: 'body',
      fontSize: 'xsmall',
      fontWeight: 'body',
      borderRadius: '8px',
      border: '2px solid transparent',
      whiteSpace: 'nowrap',
      padding: '0.25rem 0.75rem',
      mx: '0.5rem',
    },
  },
  button: {
    large: {
      lineHeight: '46px',
      paddingX: 'xlarge',
    },
    small: {
      lineHeight: '30px',
      paddingX: 'medium',
    },
    xsmall: {
      lineHeight: '16px',
    },
    primary: {
      ...button.root,
      ...button.primary,
    },
    secondary: {
      ...button.root,
      ...button.secondary,
    },
    ghost: {
      ...button.root,
      ...button.ghost,
    },
    text: {
      ...button.root,
      ...button.text,
    },
    menu: {
      ...button.root,
      ...button.menu,
    },
    select: {
      ...button.root,
      ...button.select,
    },
    close: {
      ...button.root,
      ...button.close,
    },
  },
  checkbox: {
    default: {
      color: colors.gray70,
    },
  },
  dialog: {
    wrapper: {
      display: 'block',
      borderRadius: '2px',
      paddingLeft: 'large',
      paddingBottom: 'large',
    },
    body: {
      paddingTop: 'medium',
    },
    onClose: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'start',
      paddingTop: 'xsmall',
      paddingX: 'xsmall',
    },
  },
  divider: {
    regular: {
      m: 'none',
      my: 'small',
      border: 0,
      borderBottom: '1px solid',
    },
    bold: {
      m: 'none',
      my: 'small',
      border: 0,
      borderBottom: '2px solid',
    },
    section: {
      m: 'none',
      mb: 'small',
      border: 0,
      borderBottom: '1px solid',
      borderColor: colors.gray50,
    },
  },
  images: {
    fullWidth: {
      maxWidth: '100%',
      height: 'auto',
    },
  },
  input: {
    default: {
      fontFamily: 'body',
      color: 'text',
      border: 'none',
      borderRadius: '2px',
      boxShadow: '0 0 0 1px ' + colors.gray40,
      outline: 'none',
      padding: '0 8px',
      lineHeight: '32px',
      ':focus': {
        boxShadow: '0 0 0 2px ' + colors.blue60,
      },
      ':disabled': {
        bg: colors.gray20,
        color: colors.gray40,
        cursor: 'not-allowed',
      },
    },
    error: {
      color: 'text',
      border: 'none',
      borderRadius: '2px',
      boxShadow: '0 0 0 1px ' + colors.red60,
      outline: 'none',
      padding: '0 8px',
      lineHeight: '32px',
    },
  },
  label: {
    above: {
      fontFamily: 'body',
      fontSize: 'xxsmall',
      fontWeight: 'body',
      lineHeight: 'body',
      color: 'text',
    },
    inline: {
      fontFamily: 'body',
      fontSize: 'xsmall',
      fontWeight: 'body',
      lineHeight: '1.5rem',
      color: 'text',
    },
    disabled: {
      fontFamily: 'body',
      fontSize: 'xxsmall',
      fontWeight: 'body',
      lineHeight: 'body',
      color: colors.gray30,
    },
    section: {
      fontFamily: 'body',
      fontSize: 'small',
      fontWeight: 'body',
      lineHeight: '32px',
      color: colors.gray50,
    },
  },
  menuItem: {
    default: {
      display: 'block',
      fontFamily: 'body',
      fontSize: 'xsmall',
      fontWeight: 'body',
      padding: 'xsmall',
      bg: colors.gray10,
      color: 'text',
      ':hover': {
        bg: colors.gray30,
        cursor: 'pointer',
      },
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
      mb: '8px',
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
      fontSize: 'xlarge',
      m: 'none',
    },
    h2: {
      ...text.root,
      fontWeight: 'heading',
      fontSize: 'large',
      m: 'none',
    },
    h3: {
      ...text.root,
      fontWeight: 'heading',
      fontSize: 'medium',
      m: 'none',
    },
    h4: {
      ...text.root,
      fontWeight: 'heading',
      fontSize: 'small',
      m: 'none',
    },
    h5: {
      ...text.root,
      fontWeight: 'heading',
      fontSize: 'xsmall',
      m: 'none',
    },
    h6: {
      ...text.root,
      fontSize: 'xsmall',
      textTransform: 'uppercase',
      m: 'none',
    },
    link: {
      color: colors.blue60,
      ':hover': {
        textDecoration: 'none',
      },
    },
    menuItemLink: {
      color: 'text',
      textDecoration: 'none',
    },
  },
  textarea: {
    default: {
      fontFamily: 'body',
      lineHeight: '24px',
      padding: '4px 8px',
      color: 'text',
      border: 0,
      borderRadius: '2px',
      outline: '1px solid',
      ':focus': {
        outline: '2px solid',
        outlineColor: colors.blue60,
      },
      ':disabled': {
        bg: colors.gray20,
        color: colors.gray40,
      },
    },
  },
  select: {
    __default: {
      fontFamily: 'body',
      fontSize: 'xsmall',
      fontWeight: 400,
      lineHeight: '32px',
      color: 'text',
    },
    disabled: {
      fontFamily: 'body',
      fontSize: 'xsmall',
      fontWeight: 400,
      lineHeight: '32px',
      color: 'disabled',
      cursor: 'not-allowed',
    },
    listbox: {
      __default: {
        background: colors.gray00,
        border: '1px solid transparent',
        borderLeftColor: colors.gray40,
        borderRightColor: colors.gray40,
        borderBottomColor: colors.gray40,
        borderBottomRightRadius: '2px',
        borderBottomLeftRadius: '2px',
      },
      error: {
        background: colors.gray00,
        border: '1px solid transparent',
        borderLeftColor: 'error',
        borderRightColor: 'error',
        borderBottomColor: 'error',
        borderBottomLeftRadius: '2px',
        borderBottomRightRadius: '2px',
      },
    },
    section: {
      fontFamily: 'body',
      fontSize: 'xsmall',
      fontWeight: 'body',
      lineHeight: '32px',
      px: 'xxsmall',
      color: colors.gray50,
    },
    option: {
      __default: {
        ...selectOption,
        ':focus': {
          bg: colors.blue20,
        },
      },
      selected: {
        ...selectOption,
        color: colors.gray00,
        bg: colors.blue60,
      },
      disabled: {
        ...selectOption,
        cursor: 'not-allowed',
        color: colors.gray40,
      },
    },
  },
  validation: {
    error: {
      ...text.root,
      fontSize: 'xxsmall',
      color: 'error',
    },
  },
};

export default theme;
