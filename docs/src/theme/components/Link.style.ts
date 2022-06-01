import { Theme } from '@marigold/components';

export const Link: Theme['components']['Link'] = {
  base: {
    color: 'gray.20',
    textDecoration: 'none',

    '&:hover': {
      color: 'blue.70',
    },

    '&:disabled': {
      cursor: 'disabled',
    },
  },
  variant: {
    outline: {
      display: 'inline-flex',
      alignItems: 'center',
      columnGap: 10,
      borderRadius: 'medium',
      border: 'solid',
      lineHeight: 1,
      color: 'gray.20',
      textDecoration: 'none',
      py: 'xsmall',
      px: 'medium',

      '&:hover': {
        bg: 'gray.90',
      },
    },
  },
};
