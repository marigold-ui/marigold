import type { Theme } from '@marigold/components';

export const Card: Theme['components']['Card'] = {
  base: {
    container: {
      bg: 'gray00',
      p: 'small',
      boxShadow: '0px 4px 4px rgba(165, 165, 165, 0.25)',
      borderRadius: 'large',
    },
    title: {
      color: 'gray70',
      fontSize: 'large',
      fontWeight: 'heading',
      lineHeight: 'medium',
    },
  },
};
