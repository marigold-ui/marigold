import { Theme } from '@marigold/components';

export const DatePicker: Theme['components']['DatePicker'] = {
  base: {
    field: {
      '&:focus-within button': {
        bg: 'gray50',
        '& svg': {
          color: 'white',
        },
      },
    },
    actionButton: {
      '& button[data-hover]': {
        backgroundColor: 'gray50',
      },
      '&[data-focus] button': {
        background: 'gray80',
      },
      '&[data-focus] button, button[data-hover]': {
        '& svg': {
          color: 'white',
        },
      },
    },
  },
};
