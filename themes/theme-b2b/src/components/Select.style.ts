import type { Theme } from '@marigold/components';
import { colors } from '../colors';

export const Select: Theme['components']['Select'] = {
  base: {
    button: {
      appearance: 'none',
      lineHeight: 'large',

      px: 'xsmall',

      bg: 'gray00',
      borderRadius: 'small',
      border: '1px solid',
      borderColor: 'gray40',

      outline: 'none',
      cursor: 'pointer',

      '&:hover': {
        borderColor: 'gray50',
      },

      '&:focus-visible': {
        borderColor: 'blue60',
        boxShadow: `0 0 0 1px ${colors.blue60}`,
      },

      '&:expanded': {
        bg: 'gray20',
        borderColor: 'gray40',
      },

      '&:disabled': {
        bg: 'gray20',
        color: 'gray40',
        cursor: 'not-allowed',
      },

      '&:error': {
        borderColor: 'error',
      },
    },
  },
};
