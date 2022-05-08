import type { Theme } from '@marigold/components';
import { colors } from '../colors';

export const NumberField: Theme['components']['NumberField'] = {
  base: {
    group: {
      border: '1px solid',
      borderColor: 'gray40',
      borderRadius: 'small',

      '&:hover': {
        borderColor: 'gray50',
      },

      '&:focus': {
        borderColor: 'blue60',
        boxShadow: `0 0 0 1px ${colors.blue60}`,
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
    stepper: {
      width: 'xsmall',

      '&:nth-of-type(1)': {
        borderRight: '1px solid',
        borderColor: 'gray40',
      },
      '&:nth-of-type(2)': {
        borderLeft: '1px solid',
        borderColor: 'gray40',
      },

      '&:hover': {
        bg: 'gray10',
      },

      '[data-hover] &': {
        borderColor: 'gray50',
      },

      '[data-focus] &': {
        borderColor: 'blue60',
      },

      '[data-error] &': {
        borderColor: 'red60',
      },

      '&:disabled': {
        color: 'gray40',
      },
    },
  },
};
