import type { Theme } from '@marigold/components';

export const Card: Theme['components']['Card'] = {
  base: {
    bg: 'gray00',
    p: 'small',
    boxShadow: '0px 4px 4px rgba(165, 165, 165, 0.25)',
    borderRadius: 'large',
  },
  variant: {
    highlight: {
      width: '100%',
      p: 'xxlarge',
      bg: 'gray20',
      borderRadius: '10px',
      display: 'flex',
      justifyContent: 'center',
    },
  },
};
