import type { Theme } from '@marigold/components';
import { colors } from '../colors';

export const Headline: Theme['components']['Headline'] = {
  base: {
    fontFamily: 'headline',
    fontWeight: 'medium',
    textTransform: 'uppercase',
    fontSize: 'medium-1',
    lineHeight: 'small-3',
    mt: 'small-3',
    mb: 'small-1',
  },

  variant: {
    gradient: {
      '> span': {
        display: 'inline-block',
        color: 'transparent',
        background: `linear-gradient(45deg, ${colors.brand.primary}, #edca55) 0 0 / 100% `,
        backgroundClip: 'text',
      },
    },
  },

  size: {
    'level-1': {
      my: 'none',
      fontSize: 'large-2',
      fontWeight: 'heavy',
      lineHeight: 'small-1',
      textTransform: 'uppercase',
      letterSpacing: '1px',
    },
  },
};
