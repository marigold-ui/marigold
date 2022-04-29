import type { Theme } from '@marigold/components';

export const ListBox: Theme['components']['ListBox'] = {
  base: {
    container: {
      p: 'none',
      mt: 2,

      bg: 'gray00',
      border: '1px solid',
      borderColor: 'gray40',
      borderRadius: 'small',

      outline: 'none',

      '&:error': {
        borderColor: 'error',
      },
    },

    option: {
      p: 'xsmall',

      outline: 'none',
      cursor: 'pointer',

      '&:focus': {
        bg: 'orange20',
      },

      '&:selected': {
        color: 'gray00',
        bg: 'orange60',
      },

      '&:disabled': {
        cursor: 'not-allowed',
        color: 'gray40',
      },
    },

    section: {
      outline: 'none',
      px: 'xxsmall',
      color: 'gray50',
    },
  },
};
