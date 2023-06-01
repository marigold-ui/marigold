import { Theme } from '@marigold/components';

export const DateField: Theme['components']['DateField'] = {
  base: {
    field: {
      borderColor: 'gray40',
      '&[data-error]': {
        borderColor: 'red60',
      },
      '&[data-focus]': {
        borderColor: 'purple60',
      },
      '&[data-error], &[data-focus]': {
        '& .segments-container': {
          color: 'gray60',
        },
      },

      '&[data-hover]:not([data-focus])': {
        borderColor: 'gray50',
      },
      '&[data-disabled]': {
        bg: '#F1F1F1',
        cursor: 'not-allowed',
        color: 'gray40',
      },
    },
  },
};
