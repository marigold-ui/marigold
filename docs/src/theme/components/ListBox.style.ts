import type { Theme } from '@marigold/components';

export const ListBox: Theme['components']['ListBox'] = {
  base: {
    container: {
      mt: 'xxsmall',

      bg: 'gray00',
      border: '1px solid',
      borderColor: 'gray40',
      borderRadius: 'large',

      '&:error': {
        borderColor: 'error',
      },
    },

    list: {
      p: 'xxsmall',
      outline: 'none',
    },

    option: {
      py: 'xxsmall',
      px: 'xsmall',

      borderRadius: 'large',

      outline: 'none',
      cursor: 'pointer',

      '&:focus': {
        bg: 'orange20',
      },

      '&:selected': {
        color: 'gray00',
        bg: 'orange40',
      },

      '&:disabled': {
        cursor: 'not-allowed',
        color: 'gray40',
      },
    },

    sectionTitle: {
      color: 'gray50',
      fontSize: 'xxsmall',
      pt: 'xsmall',
      px: 'xsmall',
    },

    section: {
      outline: 'none',

      '&:nth-child(n+1)': {
        borderTop: '1px solid',
        borderColor: 'gray40',
      },
    },
  },
};
