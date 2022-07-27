import type { Theme } from '@marigold/components';

export const Callout: Theme['components']['Callout'] = {
  base: {
    container: {
      border: '1px solid',
      borderColor: 'info',
      p: 'small',
    },
    icon: {
      color: 'info',
    },
  },
};
