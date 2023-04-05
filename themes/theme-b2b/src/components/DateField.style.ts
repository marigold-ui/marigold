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
        backgroundColor: '#F1F1F1',
        cursor: 'not-allowed',
      },
      '&:error': {
        borderColor: 'red60',
      },
    },
    segment: {
      '&:focus': {
        background: 'gray60',
        color: 'white',
        '& span': {
          color: 'white',
        },
      },
      '&.disabled': {
        color: 'gray40',
      },
    },
    calendarButton: {
      '& button:not(:disabled):hover': {
        backgroundColor: 'gray50',
      },
      '& button:not(:disabled):hover, & button:focus, &.isPressed': {
        '& svg': {
          color: 'white',
        },
      },
      '& button:focus, &.isPressed': {
        background: 'gray80',
      },
    },
  },
};
