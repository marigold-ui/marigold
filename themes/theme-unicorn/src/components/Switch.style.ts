import type { Theme } from '@marigold/components';

export const Switch: Theme['components']['Switch'] = {
  base: {
    label: {
      fontSize: 'xxsmall',
      color: 'text',
    },
    switch: {
      fill: 'gray20',
      stroke: 'gray40',
      '&:checked': {
        fill: 'primary',
        stroke: '#311b92',
      },
      '&:disabled': {
        fill: 'gray30',
        stroke: 'gray40',
      },
    },
  },
};
