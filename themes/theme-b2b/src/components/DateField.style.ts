import { Theme } from '@marigold/components';

export const DateField: Theme['components']['DateField'] = {
  base: {
    field: {
      border: '1px solid',
      borderColor: 'gray40',
      '&[data-error]': {
        borderColor: 'red60',
      },
      '&[data-focus]': {
        borderColor: 'orange60',
      },
      '&[data-error], &[data-focus]': {
        '& .segments-container': {
          color: 'gray60',
        },
      },
      '&[data-disabled]': {
        bg: '#F1F1F1',
        cursor: 'not-allowed',
        color: 'gray40',
      },
      '&[data-hover]:not([data-focus])': {
        borderColor: 'gray50',
      },
    },
    segmentsContainer: {
      color: 'gray40',
    },
    segment: {
      '&[data-focus-visible]': {
        bg: 'gray60',
        color: 'white',
      },
      '&:not([data-disabled]):not([data-focus-visible])': {
        '& span:nth-of-type(2)': {
          '&:not(.literal), &.activeLiteral': {
            color: 'gray60',
          },
        },
      },
    },
  },
};
