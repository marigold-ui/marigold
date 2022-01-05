import { colors } from './colors';
import { text } from './typography';

/**
 * Select component
 */
const selectButton = {
  appearance: 'none',
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  overflow: 'hidden',
  outline: 'none',
  width: '100%',
  lineHeight: 'large',
  px: 'xsmall',
  color: 'inherit',
  bg: 'transparent',
} as const;

const selectOption = {
  fontFamily: 'body',
  fontSize: 'xsmall',
  fontWeight: 'body',
  lineHeight: 'large',
  outline: 'none',
  cursor: 'pointer',
  color: 'text',
  px: 'xsmall',
  listStyle: 'none',
} as const;

const select = {
  __default: {
    fontFamily: 'body',
    fontSize: 'xsmall',
    fontWeight: 400,
    lineHeight: 'large',
    color: 'text',
  },
  disabled: {
    fontFamily: 'body',
    fontSize: 'xsmall',
    fontWeight: 400,
    lineHeight: 'large',
    color: 'disabled',
    cursor: 'not-allowed',
  },
  listbox: {
    __default: {
      bg: 'background',
      border: '1px solid transparent',
      borderLeftColor: 'gray40',
      borderRightColor: 'gray40',
      borderBottomColor: 'gray40',
      borderBottomLeftRadius: '8px',
      borderBottomRightRadius: '8px',
    },
    error: {
      bg: 'background',
      border: '1px solid transparent',
      borderLeftColor: 'error',
      borderRightColor: 'error',
      borderBottomColor: 'error',
      borderBottomRightRadius: '8px',
      borderBottomLeftRadius: '8px',
    },
  },
  section: {
    fontFamily: 'body',
    fontSize: 'xsmall',
    fontWeight: 'body',
    lineHeight: 'large',
    px: 'xxsmall',
    color: 'gray50',
  },
  option: {
    __default: {
      ...selectOption,
      ':focus': {
        bg: 'blue20',
      },
    },
    selected: {
      ...selectOption,
      color: 'gray00',
      bg: 'blue60',
    },
    disabled: {
      ...selectOption,
      color: 'gray40',
    },
  },
} as const;

/**
 * Button component
 */
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
      bg: 'secondary',
      cursor: 'pointer',
    },
    ':disabled': {
      color: 'gray40',
      bg: 'gray20',
      cursor: 'not-allowed',
    },
  },
  secondary: {
    color: 'background',
    bg: 'secondary',
    ':hover': {
      bg: 'primary',
      cursor: 'pointer',
    },
    ':disabled': {
      color: 'gray40',
      bg: 'gray20',
      cursor: 'not-allowed',
    },
  },
  ghost: {
    color: 'secondary',
    border: '1px solid',
    outlineColor: 'gray70',
    ':hover': {
      color: 'secondary',
      bg: 'gray30',
      cursor: 'pointer',
    },
    ':disabled': {
      color: 'disabled',
      bg: 'gray00',
      outlineColor: 'disabled',
      cursor: 'not-allowed',
    },
  },
  text: {
    color: 'secondary',
    ':hover': {
      outlineColor: 'gray70',
      bg: 'gray30',
      cursor: 'pointer',
    },
    ':disabled': {
      color: 'disabled',
      bg: 'gray00',
      cursor: 'not-allowed',
      outline: 'none',
    },
  },
  menu: {
    color: 'secondary',
    bg: 'background',
    ':hover': {
      color: 'background',
      bg: 'gray60',
      cursor: 'pointer',
    },
    ':disabled': {
      color: 'gray40',
      bg: 'gray20',
      cursor: 'not-allowed',
    },
  },
  select: {
    ...selectButton,
    border: '1px solid transparent',
    borderColor: 'gray40',
    ':hover': {
      cursor: 'pointer',
    },
    ':focus': {
      boxShadow: '0 0 0 2px ' + colors.blue60,
      border: '1px solid transparent',
    },
    ':disabled': {
      bg: 'gray20',
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
      borderTopColor: 'gray40',
      borderLeftColor: 'gray40',
      borderRightColor: 'gray40',
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
} as const;

/**
 * Slider component
 */
const sliderThumb = {
  WebkitAppearance: 'none',
  boxSizing: 'border-box',
  border: '4px solid',
  borderColor: 'gray70',
  width: '16px',
  height: '16px',
  bg: 'gray00',
  borderRadius: '8px',
  cursor: 'pointer',
  marginTop: '-4px',
} as const;

const sliderTrack = {
  WebkitAppearance: 'none',
  width: '100%',
  height: '8px',
  bg: 'gray30',
  borderRadius: '8px',
  border: 'none',
} as const;

const slider = {
  default: {
    // styles need to be applied to range inputs in all browsers to override their basic appearance.
    WebkitAppearance: 'none',
    bg: 'transparent',
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
      border: '4px solid',
      borderColor: 'primary',
    },
    '&:disabled::-webkit-slider-thumb': {
      ...sliderThumb,
      border: '4px solid',
      borderColor: 'gray40',
      bg: 'gray40',
    },
    '&::-webkit-slider-runnable-track': {
      ...sliderTrack,
    },
    '&:focus::-webkit-slider-runnable-track': {
      ...sliderTrack,
      bg: 'primary',
    },
    '&:disabled::-webkit-slider-runnable-track': {
      ...sliderTrack,
      bg: 'gray40',
    },
    '&::-webkit-progress-value': {
      bg: 'green60',
    },
    // firefox
    '&::-moz-range-thumb': {
      ...sliderThumb,
    },
    '&:focus::-moz-range-thumb': {
      ...sliderThumb,
      border: '4px solid',
      borderColor: 'primary',
    },
    '&:disabled::-moz-range-thumb': {
      ...sliderThumb,
      border: '4px solid',
      borderColor: 'gray40',
      bg: 'gray40',
    },
    '&::-moz-range-track': {
      ...sliderTrack,
    },
    '&::-moz-range-progress': {
      ...sliderTrack,
      bg: 'gray70',
    },
    '&:focus::-moz-range-progress': {
      ...sliderTrack,
      bg: 'primary',
    },
    '&:disabled::-moz-range-progress': {
      ...sliderTrack,
      bg: 'gray40',
    },
  },
} as const;

export const components = {
  alert: {
    error: {
      alignItems: 'center',
      borderStyle: 'solid',
      borderColor: 'error',
      borderWidth: '3px 3px 3px 0px',
    },
    warning: {
      alignItems: 'center',
      borderStyle: 'solid',
      borderColor: 'warning',
      borderWidth: '3px 3px 3px 0px',
    },
    success: {
      alignItems: 'center',
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
      lineHeight: 'xxlarge',
      paddingX: 'xlarge',
    },
    small: {
      lineHeight: 'large',
      paddingX: 'medium',
    },
    xsmall: {
      lineHeight: 'xsmall',
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
  card: {
    default: {
      maxWidth: '500px',
      bg: 'gray00',
      p: 'small',
      boxShadow: '8px 8px 4px rgba(201, 177, 255, 0.5)',
      borderRadius: '8px',
    },
  },
  checkbox: {
    default: {
      ariaHidden: 'true',
      mr: 2,
      verticalAlign: 'middle',
      ':hover': { cursor: 'pointer' },
      'input:disabled ~ &': {
        cursor: 'not-allowed',
      },
    },
    checked: {
      fill: 'primary',
      stroke: '#311b92',
      disabled: {
        fill: 'gray30',
        stroke: 'gray30',
      },
      icon: {
        fill: 'gray00',
      },
    },
    unchecked: {
      fill: 'gray00',
      stroke: 'gray40',
      disabled: {
        stroke: 'gray30',
      },
      error: {
        stroke: 'error',
      },
    },
  },
  dialog: {
    wrapper: {
      display: 'flex',
      justifyContent: 'space-between',
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
    modalWrapper: {
      position: 'fixed',
      zIndex: 100,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      bg: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalBody: {
      bg: '#ffffff',
      minWidth: '510px',
      minHeight: '240px',
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
      borderColor: 'gray50',
    },
  },
  image: {
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
      border: 'none',
      borderRadius: '2px',
      boxShadow: '0 0 0 1px ' + colors.gray40,
      outline: 'none',
      padding: '0 12px',
      lineHeight: 'large',
      ':focus': {
        boxShadow: '0 0 0 2px ' + colors.blue60,
      },
      ':disabled': {
        bg: 'gray20',
        color: 'gray40',
        cursor: 'not-allowed',
      },
    },
    error: {
      fontFamily: 'body',
      color: 'text',
      border: 'none',
      borderRadius: '2px',
      boxShadow: '0 0 0 1px ' + colors.red60,
      outline: 'none',
      padding: '0 8px',
      lineHeight: 'large',
    },
  },
  label: {
    above: {
      fontFamily: 'body',
      fontSize: 'xsmall',
      fontWeight: 'body',
      lineHeight: 'medium',
      color: 'text',
    },
    inline: {
      fontFamily: 'body',
      fontSize: 'xsmall',
      fontWeight: 'body',
      lineHeight: 'large',
      color: 'text',
      display: 'inline-flex',
      alignItems: 'center',
    },
    disabled: {
      fontFamily: 'body',
      fontSize: 'xsmall',
      fontWeight: 'body',
      lineHeight: 'medium',
      color: 'gray30',
    },
    section: {
      fontFamily: 'body',
      fontSize: 'small',
      fontWeight: 'body',
      lineHeight: 'large',
      color: 'gray50',
    },
  },
  menuItem: {
    default: {
      display: 'block',
      fontFamily: 'body',
      fontSize: 'xsmall',
      fontWeight: 'body',
      padding: 'xsmall',
      bg: 'background',
      color: 'text',
      ':hover': {
        bg: 'secondary',
        cursor: 'pointer',
      },
    },
  },
  message: {
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
  radio: {
    default: {
      ariaHidden: 'true',
      mr: 2,
      verticalAlign: 'middle',
      ':hover': { cursor: 'pointer' },
      'input:disabled ~ &': {
        color: 'muted',
        cursor: 'not-allowed',
      },
    },
    checked: {
      fill: 'primary',
      stroke: '#311b92',
      disabled: {
        fill: 'gray30',
        stroke: 'gray30',
      },
      circle: {
        fill: 'gray00',
      },
    },
    unchecked: {
      fill: 'gray00',
      stroke: 'gray40',
      disabled: {
        stroke: 'gray30',
      },
      error: {
        stroke: 'error',
      },
    },
  },
  select,
  slider,
  textarea: {
    __default: {
      fontFamily: 'body',
      lineHeight: 'medium',
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
        bg: 'gray20',
        color: 'gray40',
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
} as const;
