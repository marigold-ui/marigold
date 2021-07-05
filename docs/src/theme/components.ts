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
};

const select = {
  themeSwitch: {
    fontFamily: 'body',
    fontSize: 'body',
    color: 'gray.00',
    bg: 'gray.90',
    p: 'xsmall',
    mt: 'xxsmall',
    mr: 'small',
    border: 'none',
    borderRadius: 'medium',
    cursor: 'pointer',
  },
};

const navigation = {
  wrapper: {
    fontFamily: 'body',
  },
  header: {
    textTransform: 'uppercase',
    color: 'gray.80',
    fontSize: 'xxxsmall',
    fontWeight: 'bold',
    letterSpacing: '0.1em',
    pt: 'large',
    pb: 'small',
  },
  item: {
    fontSize: 'small',
    fontWeight: 'medium',
    lineHeight: 'cap',
    pb: 'small',
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
    copy: {
      ...button.primary,
      ...button.large,
      color: 'black',
      bg: 'transparent',
      border: 'grey',
    },
    toggle: {
      ...button.primary,
      color: 'black',
      bg: 'transparent',
    },
  },
  navigation,
  select,
};
