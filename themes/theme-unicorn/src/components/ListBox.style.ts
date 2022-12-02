import type { Theme } from '@marigold/components';

export const ListBox: Theme['components']['ListBox'] = {
  base: {
    container: {
      mt: 2,

      bg: 'gray00',
      border: '1px solid',
      borderColor: 'gray40',
      borderRadius: 'small',

      height: '25vh',
      overflow: 'hidden auto',

      '&:error': {
        borderColor: 'error',
      },
    },

    list: {
      outline: 'none',
    },

    option: {
      p: 'xsmall',

      outline: 'none',
      cursor: 'pointer',

      '&:focus': {
        bg: 'purple20',
      },

      '&:selected': {
        color: 'gray00',
        bg: 'purple60',
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
