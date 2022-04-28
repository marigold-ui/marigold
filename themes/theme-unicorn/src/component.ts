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

export const component = {
  button: {
    __default: {
      p: 0,
      border: 'none',
    },
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
    },
    secondary: {
      ...button.root,
    },
    ghost: {
      ...button.root,
    },
    text: {
      ...button.root,
    },
  },
  dialog: {
    __default: {
      bg: 'background',
      minWidth: '400px',
      minHeight: '400px',
    },
    backdrop: {
      bg: '#00000080',
    },
  },
  label: {
    above: {
      fontSize: 'xsmall',
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
  slider,
  switch: {
    __default: {
      fill: 'gray20',
      stroke: 'gray40',
    },
    ':checked': {
      fill: 'primary',
      stroke: '#311b92',
    },
    ':disabled': {
      fill: 'gray30',
      stroke: 'gray40',
    },
  },
  tooltip: {
    __default: {
      p: 'xsmall',
      color: 'gray90',
      border: '1px solid',
      borderRadius: 'large',
      bg: 'info',
    },
  },
  validation: {
    error: {
      fontSize: 'xsmall',
      textTransform: 'uppercase',
      color: 'error',
    },
  },
} as const;
