import type { Theme } from '@marigold/components';
import { colors } from '../colors';

export const Headline: Theme['components']['Headline'] = {
  base: {
    fontFamily: 'headline',
    fontWeight: 'medium',
    textTransform: 'uppercase',
    fontSize: 'fluid.medium-1',
    lineHeight: 'small-3',
    mt: 'large-1',
    mb: 'medium-1',

    '> a': {
      '&:hover': {
        color: 'inherit',
      },

      '&:hover::before': {
        content: '"#"',
        position: 'absolute',
        display: 'inline-block',
        left: '-1em',
        color: 'brand.secondary',
      },
    },
  },

  variant: {
    gradient: {
      '> span': {
        display: 'inline-block',
        color: 'transparent',
        background: `linear-gradient(45deg, ${colors.brand.primary}, ${colors.yellow.base}) 0 0 / 100% `,
        backgroundClip: 'text',
        hyphens: 'auto',
        wordBreak: 'break-word',
      },
    },
  },

  size: {
    'level-1': {
      my: 'none',
      fontSize: 'fluid.large-2',
      fontWeight: 'heavy',
      lineHeight: 'small-1',
      textTransform: 'uppercase',
      letterSpacing: '1px',
    },
    'level-3': {
      my: 'none',
      pb: 'medium-1',
      fontSize: 'fixed.small-3',
      fontWeight: 'medium',
      lineHeight: 'small-1',
      textTransform: 'uppercase',
      letterSpacing: '1px',
    },
  },
};
