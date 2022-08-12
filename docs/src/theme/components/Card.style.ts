import type { Theme } from '@marigold/components';

export const Card: Theme['components']['Card'] = {
  base: {
    bg: 'background.foreground',
    borderStyle: 'solid',
    borderWidth: 'small-1',
    borderColor: 'border.light',
    borderRadius: 'small-2',

    boxShadow: 'medium-1',
    transition: 'all .3s cubic-bezier(.25, 0, .4, 1)',
  },
  variant: {
    icon: {
      cursor: 'pointer',

      '&:hover': {
        borderColor: 'border.regular',
        boxShadow: 'medium-2',
      },
    },
  },
};
