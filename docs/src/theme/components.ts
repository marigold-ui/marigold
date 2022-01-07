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
  lineHeight: '32px',
  px: 'xsmall',
  py: 'xxsmall',
  color: 'inherit',
  bg: 'transparent',
} as const;

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
} as const;

const select = {
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
      background: 'white',
      borderTop: 'none',
      borderRight: '1px solid',
      borderLeft: '1px solid',
      borderBottom: '1px solid',
      borderBottomRightRadius: 'medium',
      borderBottomLeftRadius: 'medium',
      borderColor: 'gray30',
      outline: 'none',
    },
    error: {
      background: 'white',
      borderTop: 'none',
      borderRight: '1px solid',
      borderLeft: '1px solid',
      borderBottom: '1px solid',
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
      color: 'white',
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
  primary: {
    appearance: 'none',
    display: 'inline-flex',
    textAlign: 'center',
    lineHeight: 'body',
    fontSize: 'body',
    fontFamily: 'body',
    textDecoration: 'none',
    color: 'white',
    bg: 'primary',
    border: 'none',
    borderRadius: 'medium',
    cursor: 'pointer',
  },
  secondary: {
    color: 'white',
    bg: 'secondary',
  },
  large: {
    px: 'small',
    py: 'xsmall',
  },
  table: {
    px: 'xsmall',
    py: 'small',
  },
  small: {
    px: 'xsmall',
    py: 'xxsmall',
  },
  select: {
    ...selectButton,
    border: '1px solid',
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
      border: '1px solid',
      borderRadius: 'medium',
      borderColor: 'error',
    },
    open: {
      ...selectButton,
      borderTop: '1px solid',
      borderRight: '1px solid',
      borderLeft: '1px solid',
      borderBottom: 'none',
      marginBottom: '1px',
      borderColor: 'gray40',
      borderTopRightRadius: 'medium',
      borderTopLeftRadius: 'medium',
    },
    errorOpened: {
      ...selectButton,
      borderTop: '1px solid',
      borderRight: '1px solid',
      borderLeft: '1px solid',
      borderBottom: 'none',
      marginBottom: '1px',
      borderColor: 'error',
      borderTopRightRadius: 'medium',
      borderTopLeftRadius: 'medium',
    },
  },
} as const;

export const components = {
  button: {
    large: {
      ...button.large,
    },
    table: {
      ...button.table,
    },
    small: {
      ...button.small,
    },
    primary: {
      ...button.primary,
    },
    secondary: {
      ...button.secondary,
    },
    action: {
      ...button.primary,
      pr: 'xsmall',
      color: 'gray60',
      bg: 'transparent',
      fontWeight: 'body',
      fontSize: 'xxsmall',
      ':focus': {
        outline: 'none',
      },
    },
    icon: {
      ...button.primary,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      display: 'inline-flex',
      color: 'gray60',
      bg: 'transparent',
      fontWeight: 'body',
      fontSize: 'xxsmall',
      ':focus': {
        outline: 'none',
      },
      ':hover': {
        bg: 'white',
      },
    },
    select: {
      ...button.primary,
      ...button.select,
    },
  },
  card: {
    default: {
      background: 'white',
      p: 'small',
      boxShadow: '0px 4px 4px rgba(165, 165, 165, 0.25)',
      borderRadius: '10px',
    },
    highlight: {
      p: 'xxlarge',
      background: 'gray20',
      borderRadius: '10px',
      display: 'flex',
      justifyContent: 'center',
    },
  },
  divider: {
    do: {
      m: 'none',
      my: 'small',
      border: 'none',
      borderBottom: '8px solid',
      color: 'green60',
    },
    dont: {
      m: 'none',
      my: 'small',
      border: 'none',
      borderBottom: '8px solid',
      color: 'red60',
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
      lineHeight: 'cap',
      pb: 'small',
    },
  },
  select,
} as const;
