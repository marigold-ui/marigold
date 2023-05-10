import type { Theme } from '@marigold/components';
import { colors } from '../colors.js';

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

      '&:disabled': {
        color: 'gray40',

        bg: 'gray20',
        borderColor: 'gray40',

        cursor: 'not-allowed',
      },

      '&:focus-visible': {
        borderColor: 'purple60',
        boxShadow: `0 0 0 1px ${colors.purple60}`,
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
