import type { Theme } from '@marigold/components';

export const Card: Theme['components']['Card'] = {
  base: {
    bg: '#fafaf8',
    color: 'black',
    borderRadius: '5px',
    p: 'xsmall',
    boxShadow: '1px 2px 3px',
    maxWidth: '270px',
  },
  size: {
    small: {
      minHeight: '100px',
    },
  },
  size: {
    medium: {
      height: 100,
    },
  },
};
