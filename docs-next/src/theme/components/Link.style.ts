import { Theme } from '@marigold/components';

export const Link: Theme['components']['Link'] = {
  base: {
    '&:hover': {
      color: 'brand.secondary',
    },
  },
  variant: {
    navigation: {
      transition: 'transform .2s ease-in-out',
      '&:hover': {
        color: 'brand.text',
        fontWeight: 'medium',
        transform: 'scale(1.1)',
      },
    },
  },
} as const;
