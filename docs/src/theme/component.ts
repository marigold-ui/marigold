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
  py: 'xxsmall',
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
      borderTop: 'none',
      borderRight: 'solid',
      borderLeft: 'solid',
      borderBottom: 'solid',
      borderBottomRightRadius: 'medium',
      borderBottomLeftRadius: 'medium',
      borderColor: 'gray30',
      outline: 'none',
    },
    error: {
      bg: 'gray00',
      borderTop: 'none',
      borderRight: 'solid',
      borderLeft: 'solid',
      borderBottom: 'solid',
      borderBottomRightRadius: 'medium',
      borderBottomLeftRadius: 'medium',
      borderColor: 'error',
      outline: 'none',
    },
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
      color: 'disabled',
    },
  },
} as const;

/**
 * Button component
 */
const button = {
  select: {
    ...selectButton,
    border: 'solid',
    borderColor: 'gray40',
    ':hover': {
      cursor: 'pointer',
    },
    ':focus': {
      boxShadow: '0 0 0 2px #3ab3d5',
      border: 'none',
      margin: '1px',
    },
    ':disabled': {
      bg: 'gray70',
      color: 'disabled',
      cursor: 'not-allowed',
    },
    error: {
      ...selectButton,
      border: 'solid',
      borderRadius: 'medium',
      borderColor: 'error',
    },
    open: {
      ...selectButton,
      borderTop: 'solid',
      borderRight: 'solid',
      borderLeft: 'solid',
      borderBottom: 'none',
      marginBottom: '1px',
      borderColor: 'gray40',
      borderTopRightRadius: 'medium',
      borderTopLeftRadius: 'medium',
    },
    errorOpened: {
      ...selectButton,
      borderTop: 'solid',
      borderRight: 'solid',
      borderLeft: 'solid',
      borderBottom: 'none',
      marginBottom: '1px',
      borderColor: 'error',
      borderTopRightRadius: 'medium',
      borderTopLeftRadius: 'medium',
    },
  },
} as const;

export const component = {
  button: {
    select: {
      ...button.select,
    },
  },
  divider: {
    do: {
      height: '8px',
      bg: 'green60',
    },
    dont: {
      height: '8px',
      bg: 'red60',
    },
  },
  navigation: {
    wrapper: {
      fontFamily: 'body',
    },
    list: {
      p: 'none',
    },
    header: {
      color: 'gray70',
      fontSize: 'xxsmall',
      fontWeight: 'bold',
      pt: 'large',
      pb: 'small',
    },
    item: {
      fontSize: 'xxsmall',
      fontWeight: 'body',
      lineHeight: 'xsmall',
      pb: 'small',
    },
  },
  select,
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
} as const;
