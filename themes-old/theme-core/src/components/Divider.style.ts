import type { Theme } from '@marigold/components';

export const Divider: Theme['components']['Divider'] = {
  base: {
    width: '100%',
    height: '1px',
    bg: 'text',
  },
  variant: {
    bold: {
      height: '2px',
    },
  },
};
