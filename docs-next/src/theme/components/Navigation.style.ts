import { colors } from '../colors';

export const Navigation = {
  base: {
    container: {
      fontFamily: 'headline',
      bg: '#fff',
      lineHeight: 'large-1',
    },
    category: {
      fontSize: 'small-1',
      color: 'brand.secondary',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    item: {
      pl: '10px',
      fontSize: 'small-1',
      '&:hover': {
        pl: '8px',
        borderLeft: `2px solid  ${colors.brand.primary}`,
      },
    },
    list: {
      p: '0',
      pb: 'small-1',
    },
    group: {
      color: 'brand.text',
      fontWeight: 'medium',
    },
  },
} as const;
