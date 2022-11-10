import type { Theme } from '@marigold/components';

export const Card: Theme['components']['Card'] = {
  base: {
    position: 'relative',
    bg: '#fafaf8',
    borderRadius: '5px',
    p: 'xsmall',
    boxShadow: '1px 2px 3px',
    maxWidth: '270px',
  },
  variant: {
    hovering: {
      cursor: 'pointer',
      '&:hover': {
        boxShadow: '1px 3px 5px',
      },
    },
  },
  size: {
    small: {
      minHeight: '100px',
    },
  },
};
