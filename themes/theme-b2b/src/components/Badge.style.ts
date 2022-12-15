import type { Theme } from '@marigold/components';

export const Badge: Theme['components']['Badge'] = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: 'xxsmall',
    borderRadius: 'large',
    border: '2px solid transparent',
    whiteSpace: 'nowrap',
    py: 4,
    px: 12,
  },
  variant: {
    info: {
      color: 'status.info.text',
      borderColor: 'status.info.border',
      bg: 'status.info.background',
    },
  },
};
