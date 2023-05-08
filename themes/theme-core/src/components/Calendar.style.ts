import type { Theme } from '@marigold/components';

export const Calendar: Theme['components']['Calendar'] = {
  base: {
    calendar: {
      bg: 'white',
      '&:disabled': {
        color: 'gray40',
      },
    },
    calendarCell: {
      '&:disabled': {
        color: '#cccc',
        cursor: 'default',
      },
      '&[data-hover]': {
        bg: 'gray40',
      },
      '&[aria-label*=selected]': {
        fontWeight: '600',
        bg: 'gray60',
        color: '#fff',
        outline: 'none',
      },
    },
  },
};
