import type { Theme } from '@marigold/components';

export const Checkbox: Theme['components']['Checkbox'] = {
  base: {
    label: {
      fontSize: 'xxsmall',
      lineHeight: 'small',

      '&:disabled': {
        color: 'gray30',
      },
    },
    checkbox: {
      borderRadius: 'small',
      borderColor: 'gray40',
      bg: 'gray00',
      p: 2,

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
        borderColor: 'blue70',
        bg: 'blue60',
      },

      '&:indeterminate': {
        color: 'white',
        borderColor: 'blue70',
        bg: 'blue60',
      },

      '&:disabled': {
        bg: 'gray30',
        borderColor: 'gray40',
      },
    },
  },
  size: {
    small: {
      container: {
        py: 'xxsmall',
      },
    },
  },
};
