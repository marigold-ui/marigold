import type { Theme } from '@marigold/components';

export const Dialog: Theme['components']['Dialog'] = {
  base: {
    container: {
      borderRadius: '2px',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      pl: 'large',
      pr: 'large',
      pb: 'large',
      pt: 'small',
    },
    closeButton: {},
  },
};
