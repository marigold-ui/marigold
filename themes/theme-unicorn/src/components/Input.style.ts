import type { Theme } from '@marigold/components';
import { colors } from '../colors';

export const Input: Theme['components']['Input'] = {
  base: {
    color: 'text',
    lineHeight: 'large',

    border: '1px solid',
    borderColor: 'gray40',
    borderRadius: 'small',
    outline: 'none',

    py: 'none',
    px: 'xsmall',

    '&:focus': {
      borderColor: 'purple60',
      boxShadow: `0 0 0 1px ${colors.purple60}`,
    },

    '&:disabled': {
      bg: 'gray20',
      color: 'gray40',
      cursor: 'not-allowed',
    },

    '&:error': {
      borderColor: 'red60',
      boxShadow: `0 0 0 1px ${colors.red60}`,
    },
  },
};
