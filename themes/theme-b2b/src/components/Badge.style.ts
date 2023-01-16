import type { Theme } from '@marigold/components';

export const Badge: Theme['components']['Badge'] = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: 'xxsmall',
    borderRadius: 20,
    whiteSpace: 'nowrap',
    px: 8,
    py: 2,
  },
  variant: {
    info: {
      color: 'status.info.text',
      borderColor: 'status.info.border',
      bg: 'status.info.background',
    },
    dark: {
      color: 'gray00',
      bg: 'gray70',
    },
  },
};
