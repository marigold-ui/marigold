import type { Theme } from '@marigold/components';

export const Calendar: Theme['components']['Calendar'] = {
  base: {
    calendar: {
      bg: 'white',
    },
    calendarHeader: {
      color: 'gray80',
      '& button': {
        padding: '4px 8px',
        '&:hover': {
          bg: 'gray50',
          color: 'white',
        },
      },
    },
    calendarCell: {
      padding: '0.3rem',
      borderRadius: '50%',
      '&[aria-disabled=true]': {
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
