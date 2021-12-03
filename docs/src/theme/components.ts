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

const button = {
  primary: {
    appearance: 'none',
    display: 'inline-flex',
    textAlign: 'center',
    lineHeight: 'body',
    fontSize: 'body',
    fontFamily: 'body',
    textDecoration: 'none',
    px: 'xsmall',
    py: 'xxsmall',
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
  select: {
    ...selectButton,
    border: '1px solid',
    borderColor: 'gray.80',
    ':hover': {
      cursor: 'pointer',
    },
    ':focus': {
      boxShadow: '0 0 0 2px #3ab3d5',
      border: 'none',
      margin: '1px',
    },
    ':disabled': {
      bg: 'gray.20',
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
      borderColor: 'gray.80',
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
};

const card = {
  default: {
    background: 'white',
    p: 'small',
    boxShadow: '0px 4px 4px rgba(165, 165, 165, 0.25)',
    borderRadius: '10px',
  },
  highlight: {
    p: 'xxlarge',
    background: '#F3F3F3',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
  },
};

const divider = {
  do: {
    m: 'none',
    my: 'small',
    border: 'none',
    borderBottom: '8px solid',
    color: 'green',
  },
  dont: {
    m: 'none',
    my: 'small',
    border: 'none',
    borderBottom: '8px solid',
    color: 'red',
  },
};

const navigation = {
  wrapper: {
    fontFamily: 'body',
  },
  list: {
    p: 'none',
  },
  header: {
    color: 'gray.20',
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
};

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
      borderColor: 'gray.80',
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
        bg: 'blue.20',
      },
    },
    selected: {
      ...selectOption,
      color: 'white',
      bg: 'blue.60',
    },
    disabled: {
      ...selectOption,
      color: 'gray.80',
    },
  },
};

export const components = {
  button: {
    primary: {
      small: {
        ...button.primary,
      },
      large: {
        ...button.large,
      },
    },
    secondary: {
      small: {
        ...button.primary,
        ...button.secondary,
      },
      large: {
        ...button.primary,
        ...button.secondary,
        ...button.large,
      },
    },
    action: {
      ...button.primary,
      pr: 'xsmall',
      color: 'gray.40',
      bg: 'transparent',
      fontWeight: 'body',
      fontFamily: 'body',
      fontSize: 'xxsmall',
      ':focus': {
        outline: 'none',
      },
    },
    select: {
      ...button.primary,
      ...button.select,
    },
  },
  card,
  divider,
  navigation,
  select,
};
