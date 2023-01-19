import type { Theme } from '@marigold/components';

export const Badge: Theme['components']['Badge'] = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: 'xxsmall',
    borderRadius: 'large',
    whiteSpace: 'nowrap',
    py: 8,
    px: 12,
  },
  variant: {
    info: {
      color: 'purple10',
      bg: 'purple70',
    },

    dark: {
      color: 'gray00',
      bg: 'gray70',
    },
  },
};
