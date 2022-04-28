import type { Theme } from '@marigold/components';

export const ListBox: Theme['components']['ListBox'] = {
  base: {
    container: {
      fontFamily: 'body',
      fontSize: 'xsmall',
      fontWeight: 'body',
      lineHeight: 'large',
      bg: 'background',
      border: '1px solid transparent',
      borderLeftColor: 'gray40',
      borderRightColor: 'gray40',
      borderBottomColor: 'gray40',
      borderBottomLeftRadius: '8px',
      borderBottomRightRadius: '8px',

      '&:error': {
        bg: 'background',
        border: '1px solid transparent',
        borderLeftColor: 'error',
        borderRightColor: 'error',
        borderBottomColor: 'error',
        borderBottomRightRadius: '8px',
        borderBottomLeftRadius: '8px',
      },
    },
    section: {
      px: 'xxsmall',
      color: 'gray50',
    },
    option: {
      outline: 'none',
      cursor: 'pointer',
      color: 'text',
      px: 'xsmall',
      listStyle: 'none',
      '&:selected': {
        color: 'gray00',
        bg: 'blue60',
      },
      '&:disabled': {
        cursor: 'not-allowed',
        color: 'gray40',
      },
    },
  },
};
