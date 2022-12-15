import type { Theme } from '@marigold/components';

export const Button: Theme['components']['Button'] = {
  base: {
    border: 'none',
    borderRadius: 'small',
    // FIXME: when we use open-props
    lineHeight: '48px',
    px: 'large',
    outline: 'none',

    '&[data-focus-visible]': {
      outline: '1px solid',
      outlineColor: 'primary',
      outlineOffset: '1px',
    },

    '&:disabled': {
      color: 'disabled.text',
      bg: 'disabled.background',
    },
  },
  variant: {
    primary: {
      color: 'primary.text',
      bg: 'primary.background',
      '&:hover': {
        color: 'primary.text',
        bg: 'primary.hover',
      },
    },
    secondary: {
      color: 'secondary.text',
      bg: 'secondary.background',
      '&:hover': {
        color: 'secondary.text',
        bg: 'secondary.hover',
      },
    },
    ghost: {
      color: 'secondary',
      border: '1px solid',
      outlineColor: 'gray70',
      '&:hover': {
        color: 'secondary',
        bg: 'gray40',
      },
    },
    text: {
      color: 'secondary',
      '&:hover': {
        color: 'secondary',
        outlineColor: 'gray70',
        bg: 'gray40',
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
