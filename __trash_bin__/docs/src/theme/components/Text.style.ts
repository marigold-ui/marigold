import type { Theme } from '@marigold/components';

export const Text: Theme['components']['Text'] = {
  base: {
    lineHeight: 'large-1',
    mb: 'medium-1',
  },

  variant: {
    'page-caption': {
      fontFamily: 'headline',
      fontSize: 'fixed.medium-1',
      color: 'text.light',
      m: 'none',
    },
    caption: {
      fontFamily: 'headline',
      fontSize: 'fixed.small-2',
      letterSpacing: '0.5px',
      lineHeight: 'small-1',
      mt: 'small-1',
      mb: 'none',
    },
    muted: {
      fontFamily: 'headline',
      color: 'brand.secondary',
    },
    content: {
      mb: 'none',
    },
  },
};
