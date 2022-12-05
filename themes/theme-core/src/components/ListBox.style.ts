import type { Theme } from '@marigold/components';

export const ListBox: Theme['components']['ListBox'] = {
  base: {
    container: {
      fontSize: 'xxsmall',
      background: 'gray00',

      px: 'xxsmall',
      pb: 'xxsmall',

      borderTop: 'none',
      borderRight: '1px solid',
      borderLeft: '1px solid',
      borderBottom: '1px solid',
      borderBottomRightRadius: '2px',
      borderBottomLeftRadius: '2px',
      borderColor: '#aaa',

      height: '75vh',
      overflow: 'hidden auto',

      '&:error': {
        background: 'gray00',
        borderTop: 'none',
        borderRight: '1px solid',
        borderLeft: '1px solid',
        borderBottom: '1px solid',
        borderBottomRightRadius: '2px',
        borderBottomLeftRadius: '2px',
        borderColor: 'error',
      },
    },

    list: {
      outline: 'none',
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
        bg: 'blue60',
      },
    },
  },
};
