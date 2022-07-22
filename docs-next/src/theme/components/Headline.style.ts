import type { Theme } from '@marigold/components';
import { colors } from '../colors';

export const Headline: Theme['components']['Headline'] = {
  base: {
    fontFamily: 'headline',
  },

  variant: {
    pageTitle: {
      color: 'transparent',
      fontWeight: 'heavy',
      background: `linear-gradient(90deg, ${colors.brand.primary}, #e3e361,  ${colors.brand.secondary}, ${colors.brand.primary}) 0 0 / 60% `,
      backgroundClip: 'text',
      pt: 'small-1',
      pb: 'small-1',
      '&:hover': {
        animation: 'move-bg 8s infinite linear',
      },
      '@keyframes move-bg': {
        to: {
          backgroundPosition: '400% 0',
        },
      },
    },
    pageHeadlines: {
      color: 'brand.primary',
    },
  },
};
