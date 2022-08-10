import { Theme } from '@marigold/components';

export const Link: Theme['components']['Link'] = {
  base: {
    position: 'relative',
    '&:hover': {
      color: 'brand.secondary',
    },
    'h2 &': {
      '&:hover::before': {
        content: '"#"',
        position: 'absolute',
        display: 'inline-block',
        left: '-1em',
      },
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
  },
} as const;
