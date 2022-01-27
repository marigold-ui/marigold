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
  primary: {
    appearance: 'none',
    display: 'inline-flex',
    textAlign: 'center',
    lineHeight: 'medium',
    fontSize: 'body',
    fontFamily: 'body',
    textDecoration: 'none',
    color: 'gray00',
    bg: 'primary',
    border: 'none',
    borderRadius: 'medium',
    cursor: 'pointer',
  },
  secondary: {
    color: 'gray00',
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
        bg: 'gray00',
      },
    },
    select: {
      ...button.primary,
      ...button.select,
    },
  },
  card: {
    __default: {
      bg: 'gray00',
      p: 'small',
      boxShadow: '0px 4px 4px rgba(165, 165, 165, 0.25)',
      borderRadius: '10px',
    },
    highlight: {
      p: 'xxlarge',
      bg: 'gray20',
      borderRadius: '10px',
      display: 'flex',
      justifyContent: 'center',
    },
  },
  divider: {
    do: {
      my: 'small',
      height: '8px',
      bg: 'green60',
    },
    dont: {
      my: 'small',
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
} as const;
