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
        '&[data-hover]': {
          bg: 'gray50',
          color: 'white',
        },
        '&[data-hover][data-active]': {
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
      '&[data-hover]': {
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
