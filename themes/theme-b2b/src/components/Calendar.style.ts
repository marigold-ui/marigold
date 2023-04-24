import type { Theme } from '@marigold/components';

export const Calendar: Theme['components']['Calendar'] = {
  base: {
    calendar: {
      bg: 'white',
      '&:disabled': {
        color: 'gray40',
      },
    },
    calendarControllers: {
      color: 'gray80',
      '& button': {
        padding: '4px 8px',
        '&:hover': {
          bg: 'gray50',
          color: 'white',
        },
        '&:hover:active:not(:disabled)': {
          bg: 'gray80',
        },
      },
    },
    calendarCell: {
      padding: '0.3rem',
      borderRadius: '50%',
      '&:disabled': {
        color: 'gray40',
        cursor: 'default',
      },
      '&:hover': {
        backgroundColor: 'orange10',
      },
      '&[aria-label*=selected]': {
        color: '#fff',
        fontWeight: '600',
        backgroundColor: 'orange60',
        outline: 'none',
      },
    },
  },
};
