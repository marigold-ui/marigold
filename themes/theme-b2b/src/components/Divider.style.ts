import type { Theme } from '@marigold/components';

export const Divider: Theme['components']['Divider'] = {
  base: {
    my: 'xsmall',
    width: '100%',
    height: '1px',
    bg: 'text',
  },
  variant: {
    bold: {
      my: 'xsmall',
      height: '2px',
    },
    section: {
      my: 'xxsmall',
      bg: 'gray50',
    },
  },
};
