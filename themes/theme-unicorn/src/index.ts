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
    borderRadius: '8px',
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
      borderRadius: '8px',
      borderColor: 'error',
    },
    open: {
      ...selectButton,
      border: '1px solid transparent',
      borderTopColor: colors.gray40,
      borderLeftColor: colors.gray40,
      borderRightColor: colors.gray40,
      borderTopRightRadius: '8px',
      borderTopLeftRadius: '8px',
    },
    errorOpened: {
      ...selectButton,
      border: '1px solid transparent',
      borderTopColor: 'error',
      borderLeftColor: 'error',
      borderRightColor: 'error',
      borderTopRightRadius: '8px',
      borderTopLeftRadius: '8px',
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
const sliderThumb = {
  WebkitAppearance: 'none',
  boxSizing: 'border-box',
  border: '4px solid ' + colors.gray70,
  width: '16px',
  height: '16px',
  background: colors.gray00,
  borderRadius: '8px',
  cursor: 'pointer',
  marginTop: '-4px',
};
const sliderTrack = {
  WebkitAppearance: 'none',
  width: '100%',
  height: '8px',
  background: colors.gray30,
  borderRadius: '8px',
  border: 'none',
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
      borderBottom: '3px solid',
    },
    section: {
      m: 'none',
      mb: 'small',
      border: 0,
      borderBottom: '1px solid',
      borderColor: colors.gray50,
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
    above: {
      fontFamily: 'body',
      fontSize: 'xsmall',
      fontWeight: 'body',
      lineHeight: 'body',
      color: 'text',
    },
    inline: {
      fontFamily: 'body',
      fontSize: 'xsmall',
      fontWeight: 'body',
      lineHeight: '2rem',
      color: 'text',
    },
    disabled: {
      fontFamily: 'body',
      fontSize: 'xsmall',
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
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
      },
      error: {
        background: colors.gray00,
        border: '1px solid transparent',
        borderLeftColor: 'error',
        borderRightColor: 'error',
        borderBottomColor: 'error',
        borderBottomRightRadius: '8px',
        borderBottomLeftRadius: '8px',
      },
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
        color: colors.gray40,
      },
    },
  },
  slider: {
    default: {
      // styles need to be applied to range inputs in all browsers to override their basic appearance.
      WebkitAppearance: 'none',
      background: 'transparent',
      borderColor: 'transparent',
      color: 'transparent',
      ':focus': {
        outline: 'none',
      },
      // chrome, safari, opera (theres actually no webkit option to style the progress bar like in firefox)
      '&::-webkit-slider-thumb': {
        ...sliderThumb,
      },
      '&:focus::-webkit-slider-thumb': {
        ...sliderThumb,
        border: '4px solid ' + colors.blue60,
      },
      '&:disabled::-webkit-slider-thumb': {
        ...sliderThumb,
        border: '4px solid ' + colors.gray40,
        background: colors.gray40,
      },
      '&::-webkit-slider-runnable-track': {
        ...sliderTrack,
      },
      '&:focus::-webkit-slider-runnable-track': {
        ...sliderTrack,
        background: colors.blue60,
      },
      '&:disabled::-webkit-slider-runnable-track': {
        ...sliderTrack,
        background: colors.gray40,
      },
      '&::-webkit-progress-value': {
        background: colors.green60,
      },
      // firefox
      '&::-moz-range-thumb': {
        ...sliderThumb,
      },
      '&:focus::-moz-range-thumb': {
        ...sliderThumb,
        border: '4px solid ' + colors.blue60,
      },
      '&:disabled::-moz-range-thumb': {
        ...sliderThumb,
        border: '4px solid ' + colors.gray40,
        background: colors.gray40,
      },
      '&::-moz-range-track': {
        ...sliderTrack,
      },
      '&::-moz-range-progress': {
        ...sliderTrack,
        background: colors.gray70,
      },
      '&:focus::-moz-range-progress': {
        ...sliderTrack,
        background: colors.blue60,
      },
      '&:disabled::-moz-range-progress': {
        ...sliderTrack,
        background: colors.gray40,
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
