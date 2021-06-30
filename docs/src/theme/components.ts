import { colors } from './colors';

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
  select: {
    themeSwitch: {
      fontFamily: 'body',
      fontSize: 'body',
      color: colors.gray['00'],
      background: colors.gray['90'],
      right: 'none',
      padding: 'xsmall',
      marginTop: 'xxsmall',
      marginRight: 'small',
      border: 'none',
      position: 'absolute',
      cursor: 'pointer',
    },
  },
};
