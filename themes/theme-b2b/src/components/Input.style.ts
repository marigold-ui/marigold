import type { Theme } from '@marigold/components';
import { colors } from '../colors';

export const Input: Theme['components']['Input'] = {
  base: {
    input: {
      color: 'text',
      lineHeight: 'large',

      bg: 'gray00',
      border: '1px solid',
      borderColor: 'gray40',
      borderRadius: 'small',
      outline: 'none',

      pl: 'xsmall',
      pr: 'xsmall',

      '&:hover': {
        borderColor: 'gray50',
      },

      '&:focus': {
        borderColor: 'orange60',
        outline: `1px solid ${colors.orange60}`,
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
