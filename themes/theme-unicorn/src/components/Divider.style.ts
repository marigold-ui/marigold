import type { Theme } from '@marigold/components';

export const Divider: Theme['components']['Divider'] = {
  base: {
    width: '100%',
    height: '1px',
    bg: 'purple40',
  },
  variant: {
    bold: {
      height: '2px',
    },
    section: {
      bg: 'gray50',
    },
  },
};
