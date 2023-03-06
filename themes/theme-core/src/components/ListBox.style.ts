import type { Theme } from '@marigold/components';

export const ListBox: Theme['components']['ListBox'] = {
  base: {
    container: {
      mt: 1,

      fontSize: 'xxsmall',
      background: 'gray00',

      border: '1px solid',
      borderRadius: 2,
      borderColor: '#aaa',

      '&:error': {
        background: 'gray00',
        border: '1px solid',
        borderColor: 'error',
      },
    },

    list: {
      outline: 'none',
      maxHeight: ['75vh', '75vh', '45vh'],
      overflow: 'auto',
    },

    section: {
      fontSize: 'xxsmall',
      fontWeight: 'bold',
      lineHeight: 'medium',
      px: 'xxsmall',
    },

    option: {
      color: 'text',
      fontSize: 'xxsmall',
      lineHeight: 'medium',

      outline: 'none',
      cursor: 'pointer',

      p: '0 6px 0 15px',

      '&:focus': {
        color: 'gray00',
        bg: '#3875d7',
        backgroundImage: 'linear-gradient(#3875d7 20%, #2a62bc 90%)',
      },

      '&:selected': {
        color: 'gray00',
        bg: '#3875d7',
        backgroundImage: 'linear-gradient(#3875d7 20%, #2a62bc 90%)',
      },

      '&:disabled': {
        cursor: 'not-allowed',
        color: 'gray40',
      },
      '&:hover': {
        color: 'gray00',
        bg: '	hsl(217, 67%, 56%)',
        backgroundImage:
          'linear-gradient(hsl(217, 67%, 65%) 20%, hsl(217, 67%, 75%) 90%)',
      },
    },
  },
};
