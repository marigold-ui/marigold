import { Theme } from '@marigold/components';
import { colors } from '../colors';

export const TextArea: Theme['components']['TextArea'] = {
  base: {
    color: 'text',
    lineHeight: 'large',

    border: '1px solid',
    borderColor: 'gray40',
    borderRadius: 'small',
    outline: 'none',

    py: 'none',
    px: 'xsmall',

    '&:hover': {
      borderColor: 'gray50',
    },

    '&:focus': {
      borderColor: 'orange60',
      boxShadow: `0 0 0 1px ${colors.orange60}`,
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
