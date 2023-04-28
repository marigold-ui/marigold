import type { Theme } from '@marigold/components';

export const Calendar: Theme['components']['Calendar'] = {
  base: {
    calendar: {
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
        bg: 'gray10',
      },
      '&[aria-label*=selected]': {
        fontWeight: '600',
        bg: 'gray10',
        outline: 'none',
      },
    },
  },
};
