import type { Theme } from '@marigold/components';

export const Badge: Theme['components']['Badge'] = {
  base: 'border-none borderRadius-8px lineHeight-48px px-large',
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
