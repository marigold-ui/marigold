import type { Theme } from '@marigold/components';
import { colors } from '../colors';

export const Input: Theme['components']['Input'] = {
  base: {
    input: {
      color: 'text',
      lineHeight: 'large',

      border: '1px solid',
      borderColor: 'gray40',
      borderRadius: 'small',
      outline: 'none',
      pl: 'xsmall',
      pr: 'xsmall',

      '&:hover': {
        borderColor: 'purple40',
      },

      '&:focus': {
        borderColor: 'purple60',
        outline: `1px solid ${colors.purple60}`,
      },

      '&:disabled': {
        bg: 'gray20',
        color: 'gray40',
        cursor: 'not-allowed',
      },

      '&:error': {
        borderColor: 'red60',
        outline: `1px solid ${colors.red60}`,
      },

      '&:in-group': {
        border: 'none',
        boxShadow: 'none',
      },
      '&:has-icon': {
        pl: 'large',
      },
    },
    icon: {
      left: 'xxsmall',
    },
  },
};
