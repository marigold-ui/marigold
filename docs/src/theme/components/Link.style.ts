import { Theme } from '@marigold/components';

export const Link: Theme['components']['Link'] = {
  base: {
    position: 'relative',
    '&:hover': {
      color: 'brand.secondary',
    },
    '&:focus': {
      outline: 'none',
    },
  },
  variant: {
    navigation: {
      '&:hover': {
        color: 'brand.text',
        fontWeight: 'medium',
        transform: 'scale(1.1)',
      },
    },
    toc: {
      fontFamily: 'headline',
    },
    figma: {
      fontFamily: 'headline',
      p: 'medium-1',
    },
  },
} as const;
