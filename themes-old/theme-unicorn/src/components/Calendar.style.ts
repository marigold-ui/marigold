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
      '&:disabled': {
        color: 'gray40',
        cursor: 'default',
      },
      '&[data-hover]': {
        backgroundColor: 'purple10',
      },
      '&[aria-label*=selected]': {
        color: '#fff',
        fontWeight: '600',
        backgroundColor: 'purple60',
        outline: 'none',
      },
    },
  },
};
