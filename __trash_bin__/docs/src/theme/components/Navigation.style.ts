import { colors } from '../colors';

export const Navigation = {
  base: {
    container: {
      fontFamily: 'headline',
      lineHeight: 'large-1',
      p: 'medium-1',
    },
    category: {
      fontSize: 'fixed.small-3',
      color: 'brand.secondary',
      fontWeight: 'regular',
      textTransform: 'uppercase',
    },
    item: {
      pl: '10px',
      fontSize: 'fixed.small-3',
      '&:hover': {
        pl: '8px',
        borderLeft: `2px solid  ${colors.brand.primary}`,
      },
    },
    list: {
      p: '0',
      pb: 'medium-1',
    },
    group: {
      color: 'text.regular',
      fontSize: 'fixed.medium-1',
      fontWeight: 'medium',
    },
  },
} as const;
