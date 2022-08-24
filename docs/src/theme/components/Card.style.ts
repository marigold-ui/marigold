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

    '&:hover': {
      borderColor: 'border.regular',
      boxShadow: 'medium-2',
    },
  },
  variant: {
    icon: {
      cursor: 'pointer',
    },
    info: {
      width: '350px',
      px: 'medium-1',
      pb: 'medium-2',
    },
  },
};
