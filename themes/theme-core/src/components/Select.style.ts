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
      lineHeight: 'medium',
      px: 'xxsmall',
      color: 'text',
      bg: 'gray00',
      border: '1px solid',
      borderColor: '#aaa',
      '&:hover': {
        cursor: 'pointer',
      },
      '&:disabled': {
        bg: 'gray20',
        color: 'disabled',
        cursor: 'not-allowed',
      },
      '&:error': {
        border: '1px solid',
        borderColor: 'error',
      },
      '&:open': {
        borderTop: '1px solid',
        borderRight: '1px solid',
        borderLeft: '1px solid',
        borderBottom: 'none',
        borderColor: '#aaa',
        borderTopRightRadius: '2px',
        borderTopLeftRadius: '2px',
        boxShadow: '0 1px 0 #fff inset',
        backgroundImage: 'linear-gradient(#eee 20%, #fff 80%)',
      },
      '&:errorOpened': {
        borderTop: '1px solid',
        borderRight: '1px solid',
        borderLeft: '1px solid',
        borderBottom: 'none',
        borderColor: 'error',
        borderTopRightRadius: '2px',
        borderTopLeftRadius: '2px',
        boxShadow: '0 1px 0 #fff inset',
        backgroundImage: 'linear-gradient(#eee 20%, #fff 80%)',
      },
    },
  },
};
