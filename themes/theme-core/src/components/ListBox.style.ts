import type { Theme } from '@marigold/components';

export const ListBox: Theme['components']['ListBox'] = {
  base: {
    container: {
      background: 'gray00',
      borderTop: 'none',
      borderRight: '1px solid',
      borderLeft: '1px solid',
      borderBottom: '1px solid',
      borderBottomRightRadius: '2px',
      borderBottomLeftRadius: '2px',
      borderColor: '#aaa',
      outline: 'none',
      px: 'xxsmall',
      pb: 'xxsmall',

      '&:error': {
        background: 'gray00',
        borderTop: 'none',
        borderRight: '1px solid',
        borderLeft: '1px solid',
        borderBottom: '1px solid',
        borderBottomRightRadius: '2px',
        borderBottomLeftRadius: '2px',
        borderColor: 'error',
        outline: 'none',
        px: 'xxsmall',
        pb: 'xxsmall',
      },
    },
    section: {
      outline: 'none',
      px: 'xxsmall',
      color: 'gray50',
    },
    option: {
      fontFamily: 'body',
      fontSize: 'xxsmall',
      fontWeight: 'body',
      lineHeight: 'medium',
      outline: 'none',
      cursor: 'pointer',
      color: 'text',
      px: '6px',
      listStyle: 'none',
      bg: 'gray00',

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
    },
  },
};
