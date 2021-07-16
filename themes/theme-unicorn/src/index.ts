import { BaseTheme } from '@marigold/components';
import { colors } from './colors';

const button = {
  root: {
    position: 'relative',
    fontFamily: 'body',
    fontSize: 'xsmall',
    fontWeight: 'body',
    border: 'none',
    borderRadius: '8px',
    display: 'inline-flex',
  },
  large: {
    lineHeight: '46px',
    paddingX: 'xlarge',
  },
  small: {
    lineHeight: '30px',
    paddingX: 'medium',
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
    appearance: 'none',
    border: '1px solid',
    borderColor: colors.gray30,
    lineHeight: '32px',
    display: 'inline-flex',
    alignItems: 'center',
    pl: 'xsmall',
    pr: 'xsmall',
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
      color: 'disabled',
      cursor: 'not-allowed',
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

const theme: BaseTheme = {
  breakpoints: ['768', '1200'],
  space: {
    none: 0,
    xxsmall: 3,
    xsmall: 12,
    small: 18,
    medium: 24,
    large: 34,
    xlarge: 42,
    xxlarge: 64,
  },
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
  badge: {
    default: {
      display: 'inline-flex',
      alignItems: 'center',
      fontFamily: 'body',
      fontSize: 'xsmall',
      fontWeight: 'body',
      borderRadius: '10px',
      border: '2px solid transparent',
      whiteSpace: 'nowrap',
      padding: '0.25rem 0.75rem',
      mx: '0.5rem',
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
    select: {
      ...button.root,
      ...button.large,
      ...button.select,
    },
  },
  checkbox: {
    default: {
      color: 'primary',
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
      paddingTop: 'small',
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
      borderBottom: '3px solid',
    },
  },
  field: {
    default: {
      fontFamily: 'body',
      fontSize: 'xsmall',
      color: 'text',
      fontWeight: 'body',
      lineHeight: '2rem',
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
  label: {
    default: {
      fontFamily: 'body',
      fontSize: 'xsmall',
      fontWeight: 'body',
      lineHeight: '2rem',
      color: 'text',
    },
    above: {
      fontFamily: 'body',
      fontSize: 'xsmall',
      fontWeight: 'body',
      lineHeight: 'body',
      color: 'text',
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
  menu: {
    menuItem: {
      display: 'block',
      fontFamily: 'body',
      fontSize: 'xsmall',
      fontWeight: 'body',
      padding: 'xsmall',
      bg: 'primary',
      color: 'text',
      ':hover': {
        bg: 'secondary',
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
      mb: 'small',
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
      marginBottom: 'medium',
      '&:first-child': {
        marginTop: 'none',
      },
    },
    h2: {
      ...text.root,
      fontWeight: 'heading',
      fontSize: 'large',
      marginTop: 'medium',
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
      marginBottom: 'small',
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
      textTransform: 'uppoercase',
    },
  },
  textarea: {
    default: {
      fontFamily: 'body',
      lineHeight: '24px',
      padding: '4px 8px',
      color: 'text',
      border: 0,
      borderRadius: '8px',
      outline: '2px solid',
      ':focus': {
        outline: '4px solid',
        outlineColor: 'primary',
      },
      ':disabled': {
        bg: colors.gray20,
        color: colors.gray40,
      },
    },
  },
  validation: {
    error: {
      ...text.root,
      fontSize: 'xsmall',
      textTransform: 'uppercase',
      color: 'error',
    },
  },
};

export default theme;
