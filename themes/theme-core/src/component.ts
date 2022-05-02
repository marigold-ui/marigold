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

export const component = {
  button: {
    __default: {
      p: 0,
      border: 'none',
    },
    large: {
      lineHeight: '30px',
      paddingX: 'medium',
      fontSize: 'xxsmall',
    },
    small: {
      lineHeight: '24px',
      paddingX: 'small',
      fontSize: 'xxsmall',
    },
    select: {
      ...button.select,
    },
  },
  card: {
    __default: {
      maxWidth: '500px',
      background: colors.gray00,
      p: 'small',
      boxShadow: '0px 4px 4px rgba(165, 165, 165, 0.25)',
      borderRadius: 'xlarge',
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
  label: {
    above: {
      fontSize: 'xxsmall',
      lineHeight: 'small',
      color: 'text',
    },
    inline: {
      fontSize: 'xxsmall',
      lineHeight: 'small',
      display: 'inline-flex',
      alignItems: 'center',
    },
    section: {
      fontSize: 'xsmall',
      lineHeight: '32px',
      color: colors.gray50,
    },
  },
  select,
  tooltip: {
    __default: {
      p: 'xsmall',
      color: 'gray90',
      fontSize: 14,
      border: '1px solid',
      borderColor: 'info',
      borderRadius: 'large',
      bg: 'blue10',
    },
  },
  validation: {
    error: {
      fontSize: '0.813rem',
      color: 'error',
    },
  },
} as const;
