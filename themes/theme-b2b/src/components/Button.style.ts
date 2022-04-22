import type { Theme } from '@marigold/components';

export const Button: Theme['components']['Button'] = {
  base: {
    border: 'none',
    borderRadius: 'small',
    // FIXME: when we use open-props
    lineHeight: '48px',
    px: 'large',
    outline: 'none',

    '&[data-focus]': {
      outline: '1px solid',
      outlineColor: 'primary',
      outlineOffset: '1px',
    },

    '&:disabled': {
      color: 'gray40',
      bg: 'gray20',
    },
  },
  variant: {
    primary: {
      color: 'background',
      bg: 'primary',
      '&:hover': {
        color: 'background',
        bg: 'orange40',
      },
    },
    secondary: {
      color: 'background',
      bg: 'secondary',
      '&:hover': {
        color: 'background',
        bg: 'gray60',
      },
    },
    ghost: {
      color: 'secondary',
      border: '1px solid',
      outlineColor: 'gray70',
      '&:hover': {
        color: 'secondary',
        bg: 'gray30',
      },
    },
    text: {
      color: 'secondary',
      '&:hover': {
        color: 'secondary',
        outlineColor: 'gray70',
        bg: 'gray30',
      },
    },
    menu: {
      color: 'secondary',
      bg: 'background',
      '&:hover': {
        color: 'background',
        bg: 'gray60',
      },
    },
  },
  size: {
    small: {
      lineHeight: '32px',
      px: 'small',
    },
  },
};
