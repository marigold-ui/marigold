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
  lineHeight: 'medium',
  px: 'xxsmall',
  color: 'text',
  bg: colors.gray00,
} as const;

const selectOption = {
  fontFamily: 'body',
  fontSize: 'xxsmall',
  fontWeight: 'body',
  lineHeight: 'medium',
  outline: 'none',
  cursor: 'pointer',
  color: 'text',
  px: '6px',
  listStyle: 'none',
  bg: colors.gray00,
} as const;

const select = {
  __default: {
    fontFamily: 'body',
    fontSize: 'xxsmall',
    fontWeight: 400,
    lineHeight: 'medium',
    color: 'text',
  },
  disabled: {
    fontFamily: 'body',
    fontSize: 'xxsmall',
    fontWeight: 400,
    lineHeight: 'medium',
    color: 'disabled',
    cursor: 'not-allowed',
  },
  listbox: {
    __default: {
      background: colors.gray00,
      borderTop: 'none',
      borderRight: '1px solid',
      borderLeft: '1px solid',
      borderBottom: '1px solid',
      borderBottomRightRadius: '2px',
      borderBottomLeftRadius: '2px',
      borderColor: '#aaa',
      outline: 'none',
      px: 'xxsmall',
      pb: 'xxsmall',
    },
    error: {
      background: colors.gray00,
      borderTop: 'none',
      borderRight: '1px solid',
      borderLeft: '1px solid',
      borderBottom: '1px solid',
      borderBottomRightRadius: '2px',
      borderBottomLeftRadius: '2px',
      borderColor: 'error',
      outline: 'none',
      px: 'xxsmall',
      pb: 'xxsmall',
    },
  },
  option: {
    __default: {
      ...selectOption,
      ':focus': {
        color: colors.gray00,
        bg: '#3875d7',
        backgroundImage: 'linear-gradient(#3875d7 20%, #2a62bc 90%)',
      },
    },
    selected: {
      ...selectOption,
      color: colors.gray00,
      bg: '#3875d7',
      backgroundImage: 'linear-gradient(#3875d7 20%, #2a62bc 90%)',
    },
    disabled: {
      ...selectOption,
      cursor: 'not-allowed',
      color: colors.gray40,
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
    border: '1px solid',
    borderColor: '#aaa',
    ':hover': {
      cursor: 'pointer',
    },
    ':focus': {
      border: '1px solid',
      borderColor: '#5897fb',
    },
    ':disabled': {
      bg: colors.gray20,
      color: 'disabled',
      cursor: 'not-allowed',
    },
    error: {
      ...selectButton,
      border: '1px solid',
      borderColor: 'error',
    },
    open: {
      ...selectButton,
      borderTop: '1px solid',
      borderRight: '1px solid',
      borderLeft: '1px solid',
      borderBottom: 'none',
      borderColor: '#aaa',
      borderTopRightRadius: '2px',
      borderTopLeftRadius: '2px',
      boxShadow: '0 1px 0 #fff inset',
      backgroundImage: 'linear-gradient(#eee 20%, #fff 80%)',
    },
    errorOpened: {
      ...selectButton,
      borderTop: '1px solid',
      borderRight: '1px solid',
      borderLeft: '1px solid',
      borderBottom: 'none',
      borderColor: 'error',
      borderTopRightRadius: '2px',
      borderTopLeftRadius: '2px',
      boxShadow: '0 1px 0 #fff inset',
      backgroundImage: 'linear-gradient(#eee 20%, #fff 80%)',
    },
  },
} as const;

/**
 * Slider component
 */
const sliderThumb = {
  WebkitAppearance: 'none',
  boxSizing: 'border-box',
  border: '4px solid ' + colors.gray70,
  width: '16px',
  height: '16px',
  background: colors.gray00,
  borderRadius: 'large',
  cursor: 'pointer',
  marginTop: '-4px',
} as const;

const sliderTrack = {
  WebkitAppearance: 'none',
  width: '100%',
  height: '8px',
  background: colors.gray30,
  borderRadius: 'large',
  border: 'none',
} as const;

const slider = {
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
} as const;

export const components = {
  alert: {
    error: {
      alignItems: 'center',
      borderStyle: 'solid',
      borderColor: 'error',
      color: 'error',
      borderWidth: '1px 1px 1px 0px',
    },
    warning: {
      alignItems: 'center',
      borderStyle: 'solid',
      borderColor: 'warning',
      color: 'warning',
      borderWidth: '1px 1px 1px 0px',
    },
    success: {
      alignItems: 'center',
      borderStyle: 'solid',
      borderColor: 'success',
      color: 'success',
      borderWidth: '1px 1px 1px 0px',
    },
  },
  badge: {
    default: {
      display: 'inline-flex',
      alignItems: 'center',
      fontFamily: 'body',
      fontSize: 'xsmall',
      fontWeight: 'body',
      borderRadius: 'large',
      border: '2px solid transparent',
      whiteSpace: 'nowrap',
      padding: '0.25rem 0.75rem',
      mx: '0.5rem',
    },
  },
  button: {
    large: {
      lineHeight: '46px',
      paddingX: 'large',
      fontSize: 'xsmall',
    },
    medium: {
      lineHeight: '30px',
      paddingX: 'medium',
      fontSize: 'xxsmall',
    },
    small: {
      lineHeight: '24px',
      paddingX: 'small',
      fontSize: 'xxsmall',
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
    default: {
      maxWidth: '500px',
      background: colors.gray00,
      p: 'small',
      boxShadow: '0px 4px 4px rgba(165, 165, 165, 0.25)',
      borderRadius: 'xlarge',
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
      fill: colors.blue60,
      stroke: colors.blue70,
      disabled: {
        fill: colors.gray30,
        stroke: colors.gray30,
      },
      icon: {
        fill: colors.gray00,
      },
    },
    unchecked: {
      fill: colors.gray00,
      stroke: colors.gray40,
      disabled: {
        stroke: colors.gray30,
      },
      error: {
        stroke: 'error',
      },
    },
  },
  dialog: {
    __default: {
      bg: '#ffffff',
      minWidth: '510px',
      minHeight: '240px',
    },
    backdrop: {
      bg: '#00000080',
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
  },
  image: {
    fullWidth: {
      maxWidth: '100%',
      height: 'auto',
    },
  },
  input: {
    __default: {
      display: 'block',
      fontFamily: 'body',
      color: 'text',
      background: colors.gray00,
      border: 'none',
      borderRadius: 'small',
      boxShadow: '0 0 0 1px #aaa',
      outline: 'none',
      padding: '0 4px',
      lineHeight: '24px',
      ':focus': {
        boxShadow: '0 0 0 2px ' + colors.blue60,
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
      fontSize: 'xxsmall',
      fontWeight: 'body',
      lineHeight: 'small',
      color: 'text',
    },
    inline: {
      fontFamily: 'body',
      fontSize: 'xxsmall',
      fontWeight: 'body',
      lineHeight: 'small',
      color: 'text',
      display: 'inline-flex',
      alignItems: 'center',
    },
    disabled: {
      fontFamily: 'body',
      fontSize: 'xxsmall',
      fontWeight: 'body',
      lineHeight: 'small',
      color: colors.gray30,
    },
    section: {
      fontFamily: 'body',
      fontSize: 'xsmall',
      fontWeight: 'body',
      lineHeight: '32px',
      color: colors.gray50,
    },
  },
  link: {
    normal: {
      color: '#900',
      ':hover, :visited': {
        textDecoration: 'none',
      },
    },
    menu: {
      color: 'text',
      textDecoration: 'none',
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
      mb: '8px',
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
      fill: colors.blue60,
      stroke: colors.blue70,
      disabled: {
        fill: colors.gray30,
        stroke: colors.gray30,
      },
      circle: {
        fill: colors.gray00,
      },
    },
    unchecked: {
      fill: colors.gray00,
      stroke: colors.gray40,
      disabled: {
        stroke: colors.gray30,
      },
      error: {
        stroke: 'error',
      },
    },
  },
  select,
  slider,
  textarea: {
    default: {
      fontFamily: 'body',
      fontSize: 'xxsmall',
      padding: '2px',
      color: 'text',
      background: colors.gray00,
      border: 0,
      boxShadow: '0 0 0 1px #aaa',
      outline: 'none',
      ':focus': {
        borderRadius: 'small',
        boxShadow: '0 0 0 2px ' + colors.blue60,
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
      fontSize: '0.813rem',
      color: 'error',
    },
  },
} as const;
