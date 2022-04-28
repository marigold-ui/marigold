import type { Theme } from '@marigold/components';

export const ListBox: Theme['components']['ListBox'] = {
  base: {
    container: {
      fontFamily: 'body',
      fontSize: 'xsmall',
      fontWeight: 'body',
      lineHeight: 'large',
      bg: 'gray00',
      border: '1px solid transparent',
      borderLeftColor: 'gray40',
      borderRightColor: 'gray40',
      borderBottomColor: 'gray40',
      borderBottomRightRadius: 'small',
      borderBottomLeftRadius: 'small',

      '&:error': {
        bg: 'gray00',
        border: '1px solid transparent',
        borderLeftColor: 'error',
        borderRightColor: 'error',
        borderBottomColor: 'error',
        borderBottomLeftRadius: 'small',
        borderBottomRightRadius: 'small',
      },
    },
    section: {
      outline: 'none',
      px: 'xxsmall',
      color: 'gray50',
    },
    option: {
      outline: 'none',
      cursor: 'pointer',
      color: 'text',
      px: 'xsmall',
      '&:focus': {
        bg: 'blue20',
      },
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
