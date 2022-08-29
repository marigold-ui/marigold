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
      px: 'small-1',
      lineHeight: 'large-2',
      color: 'text.muted',
    },
  },
} as const;
