const button = {
  primary: {
    appearance: 'none',
    display: 'inline-flex',
    textAlign: 'center',
    lineHeight: 'inherit',
    textDecoration: 'none',
    fontSize: 'inherit',
    px: 'xsmall',
    py: 'xxsmall',
    color: 'white',
    bg: 'primary',
    border: 0,
    borderRadius: 4,
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
  },
};
