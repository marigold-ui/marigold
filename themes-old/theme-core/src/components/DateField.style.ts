import { Theme } from '@marigold/components';

export const DateField: Theme['components']['DateField'] = {
  base: {
    field: {
      borderColor: '#aaa',
      '&[data-disabled]': {
        bg: '#F1F1F1',
        cursor: 'not-allowed',
        color: 'gray40',
      },
    },
  },
};
