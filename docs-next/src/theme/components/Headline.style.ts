import type { Theme } from '@marigold/components';
import { colors } from '../colors';

export const Headline: Theme['components']['Headline'] = {
  base: {
    fontFamily: 'headline',
    fontWeight: 'regular',
    fontSize: 'medium-1',
    lineHeight: 'small-3',
    mt: 'small-3',
    mb: 'small-1',
  },

  size: {
    'level-1': {
      mt: 'none',
      mb: 'small-2',

      '> span': {
        display: 'inline-block',
        color: 'transparent',
        fontSize: 'large-1',
        fontWeight: 'heavy',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        background: `linear-gradient(45deg, ${colors.brand.primary}, #edca55) 0 0 / 100% `,
        backgroundClip: 'text',
      },
    },
  },
};
