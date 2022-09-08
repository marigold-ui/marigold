import type { Theme } from '@marigold/components';

export const Card: Theme['components']['Card'] = {
  base: {
    bg: 'background.foreground',
    borderStyle: 'solid',
    borderWidth: 'small-1',
    borderColor: 'border.muted',
    borderRadius: 'medium-1',

    boxShadow: 'medium-1',
    transition: 'all .3s cubic-bezier(.25, 0, .4, 1)',
  },
  variant: {
    hovering: {
      cursor: 'pointer',

      '&:hover': {
        borderColor: 'border.light',
        boxShadow: 'medium-2',
      },
    },
  },
  size: {
    large: {
      width: '350px',
    },
  },
};
