import type { Theme } from '@marigold/components';

export const Select: Theme['components']['Select'] = {
  base: {
    button: {
      appearance: 'none',
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      overflow: 'hidden',
      outline: 'none',
      lineHeight: 'large',
      px: 'xsmall',
      color: 'inherit',
      border: '1px solid transparent',
      borderColor: 'gray40',
      bg: 'transparent',

      '&:disabled': {
        color: 'disabled',
        cursor: 'not-allowed',
      },
      '&:hover': {
        cursor: 'pointer',
      },
      '&:focus': {
        boxShadow: '0 0 0 2px ' + 'blue60',
        border: '1px solid transparent',
      },
      '&:error': {
        border: '1px solid',
        borderRadius: '8px',
        borderColor: 'error',
      },
      '&:open': {
        border: '1px solid transparent',
        borderTopColor: 'gray40',
        borderLeftColor: 'gray40',
        borderRightColor: 'gray40',
        borderTopRightRadius: '8px',
        borderTopLeftRadius: '8px',
      },
      '&:errorOpened': {
        border: '1px solid transparent',
        borderTopColor: 'error',
        borderLeftColor: 'error',
        borderRightColor: 'error',
        borderTopRightRadius: '8px',
        borderTopLeftRadius: '8px',
      },
    },
  },
};
