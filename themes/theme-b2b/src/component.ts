import { colors } from './colors';

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
    select: {
      ...button.root,
      ...button.select,
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
  label: {
    above: {
      fontSize: 'xxsmall',
      color: 'text',
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
  select,
  switch: {
    __default: {
      fill: 'gray20',
      stroke: 'gray40',
    },
    ':checked': {
      fill: 'primary',
      stroke: 'orange80',
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
      fontSize: 14,
      border: '1px solid',
      borderColor: 'blue70',
      borderRadius: 'large',
      bg: 'blue10',
    },
  },
  validation: {
    error: {
      fontSize: 'xxsmall',
      color: 'error',
    },
  },
} as const;
