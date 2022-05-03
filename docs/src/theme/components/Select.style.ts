import type { Theme } from '@marigold/components';
import { colors } from '../colors';

export const Select: Theme['components']['Select'] = {
  base: {
    button: {
      appearance: 'none',

      px: 'xsmall',

      color: 'gray70',
      lineHeight: 'large',

      bg: 'gray20',
      borderRadius: 'large',
      border: '1px solid',
      borderColor: 'gray20',

      outline: 'none',
      cursor: 'pointer',

      '&:hover': {
        borderColor: 'gray50',
      },

      '&:disabled': {
        color: 'gray40',

        bg: 'gray20',
        borderColor: 'gray40',

        cursor: 'not-allowed',
      },

      '&:focus-visible': {
        borderColor: 'blue60',
        boxShadow: `0 0 0 1px ${colors.blue60}`,
      },

      '&:expanded': {
        bg: 'gray20',
        borderColor: 'gray40',
      },

      '&:error': {
        borderColor: 'error',
      },
    },
  },
};
