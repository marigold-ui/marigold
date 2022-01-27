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
    fontWeight: 'body',
    lineHeight: 'large',
    color: 'text',
  },
  disabled: {
    fontFamily: 'body',
    fontSize: 'xsmall',
    fontWeight: 'body',
    lineHeight: 'large',
    color: 'disabled',
    cursor: 'not-allowed',
  },
  listbox: {
    __default: {
      bg: 'gray00',
      border: '1px solid transparent',
      borderLeftColor: 'gray40',
      borderRightColor: 'gray40',
      borderBottomColor: 'gray40',
      borderBottomRightRadius: 'small',
      borderBottomLeftRadius: 'small',
    },
    error: {
      bg: 'gray00',
      border: '1px solid transparent',
      borderLeftColor: 'error',
      borderRightColor: 'error',
      borderBottomColor: 'error',
      borderBottomLeftRadius: 'small',
      borderBottomRightRadius: 'small',
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
      cursor: 'not-allowed',
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
    borderRadius: 'small',
    display: 'inline-flex',
  },
  primary: {
    color: 'background',
    bg: 'primary',
    ':hover': {
      color: 'background',
      bg: 'orange40',
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
      color: 'secondary',
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
      borderRadius: 'small',
      borderColor: 'error',
    },
    open: {
      ...selectButton,
      border: '1px solid transparent',
      borderTopColor: 'gray40',
      borderLeftColor: 'gray40',
      borderRightColor: 'gray40',
      borderTopRightRadius: 'small',
      borderTopLeftRadius: 'small',
    },
    errorOpened: {
      ...selectButton,
      border: '1px solid transparent',
      borderTopColor: 'error',
      borderLeftColor: 'error',
      borderRightColor: 'error',
      borderTopRightRadius: 'small',
      borderTopLeftRadius: 'small',
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
  width: 16,
  height: 16,
  bg: 'gray00',
  borderRadius: 'large',
  cursor: 'pointer',
  marginTop: -4,
} as const;

const sliderTrack = {
  WebkitAppearance: 'none',
  width: '100%',
  height: 8,
  bg: 'gray30',
  borderRadius: 'large',
  border: 'none',
} as const;

const slider = {
  __default: {
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
      backgroundColor: 'primary',
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
      backgroundColor: 'primary',
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
      borderWidth: '2px 2px 2px 0px',
    },
    warning: {
      alignItems: 'center',
      borderStyle: 'solid',
      borderColor: 'warning',
      borderWidth: '2px 2px 2px 0px',
    },
    success: {
      alignItems: 'center',
      borderStyle: 'solid',
      borderColor: 'success',
      borderWidth: '2px 2px 2px 0px',
    },
  },
  badge: {
    __default: {
      display: 'inline-flex',
      alignItems: 'center',
      fontFamily: 'body',
      fontSize: 'xsmall',
      fontWeight: 'body',
      borderRadius: 'large',
      border: '2px solid transparent',
      whiteSpace: 'nowrap',
      py: 4,
      px: 12,
      mx: 8,
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
  },
  card: {
    __default: {
      maxWidth: 500,
      bg: 'gray00',
      p: 'small',
      boxShadow: '0px 4px 4px rgba(165, 165, 165, 0.25)',
      borderRadius: 'large',
    },
  },
  checkbox: {
    __default: {
      fill: 'gray00',
      stroke: 'gray40',
    },
    ':checked': {
      fill: 'primary',
      stroke: 'orange80',
    },
    ':disabled': {
      fill: 'gray30',
    },
    ':error': {
      stroke: 'error',
    },
  },
  dialog: {
    __default: {
      bg: 'background',
      minWidth: 510,
      minHeight: 240,
    },
    backdrop: {
      bg: '#00000080',
    },
  },
  divider: {
    __default: {
      my: 'xsmall',
    },
    bold: {
      my: 'xsmall',
      height: '2px',
    },
    section: {
      my: 'xxsmall',
      bg: 'gray50',
    },
  },
  image: {
    fullWidth: {
      maxWidth: '100%',
      height: 'auto',
    },
  },
  input: {
    __default: {
      color: 'text',
      border: 'none',
      borderRadius: 'small',
      boxShadow: '0 0 0 1px ' + colors.gray40,
      outline: 'none',
      padding: '0 8px',
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
      color: 'text',
      border: 'none',
      borderRadius: 'small',
      boxShadow: '0 0 0 1px ' + colors.red60,
      outline: 'none',
      padding: '0 8px',
      lineHeight: 'large',
    },
  },
  label: {
    above: {
      fontSize: 'xxsmall',
    },
    inline: {
      fontSize: 'xsmall',
      display: 'inline-flex',
      alignItems: 'center',
    },
    section: {
      fontSize: 'small',
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
        bg: 'gray30',
        cursor: 'pointer',
      },
    },
  },
  message: {
    warning: {
      borderStyle: 'solid',
      borderColor: 'warning',
      borderWidth: '2px 2px 2px 16px',
      pt: 'xsmall',
      pb: 'small',
      px: 'small',
      color: 'warning',
    },
    error: {
      borderStyle: 'solid',
      borderColor: 'error',
      borderWidth: '2px 2px 2px 16px',
      pt: 'xsmall',
      pb: 'small',
      px: 'small',
      color: 'error',
    },
    info: {
      borderStyle: 'solid',
      borderColor: 'info',
      borderWidth: '2px 2px 2px 16px',
      pt: 'xsmall',
      pb: 'small',
      px: 'small',
      color: 'info',
    },
    title: {
      mb: 'xsmall',
    },
  },
  radio: {
    __default: {
      fill: 'gray00',
      stroke: 'gray40',
    },
    ':disabled': {
      fill: 'gray30',
    },
    ':error': {
      stroke: 'error',
    },
    ':checked': {
      fill: 'primary',
      stroke: 'orange80',
    },
  },
  select,
  slider,
  textarea: {
    __default: {
      fontFamily: 'body',
      lineHeight: 'medium',
      py: 'xxsmall',
      px: 'xsmall',
      color: 'text',
      border: 'none',
      borderRadius: 'small',
      outline: '1px solid',
      outlineColor: 'disabled',
      ':focus': {
        outline: '2px solid',
        outlineColor: 'blue60',
      },
      ':disabled': {
        color: 'disabled',
        bg: 'gray20',
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
} as const;
