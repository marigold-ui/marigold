import { Theme } from '@marigold/components';

export const Link: Theme['components']['Link'] = {
  base: {
    transition: 'transform .2s ease-in-out',
    '&:hover': {
      fontWeight: 'medium',
      transform: 'scale(1.1)',
    },
  },
} as const;
