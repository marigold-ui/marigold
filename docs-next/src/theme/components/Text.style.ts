import type { Theme } from '@marigold/components';

export const Text: Theme['components']['Text'] = {
  base: {
    lineHeight: 'large-1',
    mb: 'small-1',
  },

  variant: {
    'page-caption': {
      fontFamily: 'headline',
      fontSize: 'small-1',
      color: 'text.light',
      m: 'none',
    },
    muted: {
      fontFamily: 'headline',
      color: 'brand.secondary',
    },
  },
};
