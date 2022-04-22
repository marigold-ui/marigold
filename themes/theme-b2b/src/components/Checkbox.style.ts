import type { Theme } from '@marigold/components';

export const Checkbox: Theme['components']['Checkbox'] = {
  base: {
    label: {
      fontSize: 'xsmall',

      '&:disabled': {
        color: 'gray40',
      },
    },
    checkbox: {
      borderRadius: 'small',
      borderColor: 'gray40',

      '&:hover': {
        borderColor: 'gray50',
      },

      '&:focus': {
        outline: '2px solid',
        outlineColor: 'blue60',
        outlineOffset: 3,
      },

      '&:checked': {
        color: 'white',
        borderColor: 'orange80',
        bg: 'primary',
      },

      '&:disabled': {
        bg: 'gray30',
        borderColor: 'gray40',
      },
    },
  },
};
