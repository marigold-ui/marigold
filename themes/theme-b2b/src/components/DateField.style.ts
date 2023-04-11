import { Theme } from '@marigold/components';

export const DateField: Theme['components']['DateField'] = {
  base: {
    field: {
      border: '1px solid',
      borderColor: 'gray40',
      outline: 'none',
      '&[data-focus], :focus-within': {
        outline: `1px solid`,
        outlineColor: 'orange60',
        borderColor: 'orange60',
      },
      '&[data-disabled]': {
        bg: '#F1F1F1',
        cursor: 'not-allowed',
      },
      '&:error': {
        borderColor: 'red60',
      },
    },
    segment: {
      '&:focus': {
        bg: 'gray60',
        '&, & span': {
          color: 'white',
        },
      },
      '&[data-disabled]': {
        color: 'gray40',
      },
    },
  },
};
