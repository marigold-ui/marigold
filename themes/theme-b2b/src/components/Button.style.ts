import type { Theme } from '@marigold/components';

export const Button: Theme['components']['Button'] = {
  base: {
    border: 'none',
    borderRadius: 'small',
    // FIXME: when we use open-props
    // TODO: This breaks the button!
    height: 48,
    lineHeight: 48,
    px: 'large',
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
      ':hover': {
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
  },
};
