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

const select = {
  themeSwitch: {
    fontFamily: 'body',
    fontSize: 'body',
    color: 'gray.00',
    bg: 'gray.90',
    right: 'none',
    padding: 'xsmall',
    marginTop: 'xxsmall',
    marginRight: 'small',
    border: 'none',
    position: 'absolute',
    cursor: 'pointer',
  },
};

const navigation = {
  wrapper: {
    overflow: 'auto',
    fontFamily: 'body',
  },
  section: {
    my: 'xsmall',
  },
  header: {
    textTransform: 'uppercase',
    color: 'gray.70',
    fontSize: 'xxxsmall',
    fontWeight: 'bold',
    letterSpacing: '0.1em',
  },
  item: {
    fontSize: 'small',
    fontWeight: 'medium',
    mb: 'xsmall',
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
