import type { Theme } from '@marigold/components';

export const Button: Theme['components']['Button'] = {
  base: {
    cursor: 'pointer',
    appearance: 'none',
    borderRadius: 'small',
    fontSize: 'xxsmall',
    lineHeight: '22px',
    height: 24,
    py: 0,
    px: 'small',
    bg: 'gray30',
    color: 'gray70',
    border: '1px solid',
    borderColor: 'gray70',
    transition: 'all 200ms ease-out',

    '&:hover': {
      bg: 'gray00',
    },

    '&:disabled': {
      cursor: 'not-allowed',
      color: 'gray40',
      bg: 'gray00',
      border: '1px solid',
      borderColor: 'gray40',
    },
  },
  variant: {
    primary: {
      color: 'gray00',
      bg: 'primary',
      borderColor: 'primary',

      '&:hover': {
        color: 'background',
        bg: 'orange40',
        borderColor: 'orange40',
      },
    },
    secondary: {
      color: 'gray70',
      bg: 'gray30',
      border: '1px solid',
      outlineColor: 'gray70',
      '&:hover': {
        bg: 'gray00',
      },
    },
    ghost: {
      color: 'secondary',
      border: '1px solid',
      outlineColor: 'gray70',
      '&:hover': {
        color: 'secondary',
        bg: 'gray10',
        cursor: 'pointer',
      },
    },
    text: {
      color: 'secondary',
      bg: 'none',
      border: 'none',
      '&:hover': {
        color: 'secondary',
        outlineColor: 'gray70',
        bg: 'gray30',
        cursor: 'pointer',
      },
    },
    link: {
      color: 'text',
      border: 'none',
      bg: 'none',
      '&:hover': {
        textDecoration: 'underline',
        bg: 'none',
        cursor: 'pointer',
      },
    },
  },
  size: {
    xxsmall: {
      p: 'xxsmall',
    },
  },
};
