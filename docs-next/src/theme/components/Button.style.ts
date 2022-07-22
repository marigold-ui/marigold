import type { Theme } from '@marigold/components';

export const Button: Theme['components']['Button'] = {
  base: {
    display: 'inline-flex',
    color: 'gray00',
    cursor: 'pointer',
    textAlign: 'center',
    lineHeight: 'medium',
    fontFamily: 'body',
    textDecoration: 'none',
    border: 'none',
    borderRadius: 'medium',
  },
  variant: {
    primary: {
      bg: 'primary',
    },
    secondary: {
      bg: 'secondary',
    },
    copy: {
      pr: 'xsmall',
      color: 'gray60',
      bg: 'transparent',
      fontWeight: 'body',
      fontSize: 'xxsmall',
      '&:focus': {
        outline: 'none',
      },
    },
    icon: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: 'gray60',
      bg: 'transparent',
      fontWeight: 'body',
      fontSize: 'xsmall',
      '&:focus': {
        outline: 'none',
      },
      '&:hover': {
        bg: 'gray00',
      },
    },
  },
  size: {
    table: {
      px: 'xsmall',
      py: 'small',
    },
    small: {
      px: 'xsmall',
      py: 'xxsmall',
    },
    large: {
      px: 'small',
      py: 'xsmall',
    },
  },
};
