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
  variant: {
    warning: {
      icon: {
        color: 'warning',
      },
      container: {
        borderColor: 'warning',
      },
    },
    danger: {
      icon: {
        color: 'red40',
      },
      container: {
        borderColor: 'red40',
      },
    },
    tip: {
      icon: {
        color: 'green40',
      },
      container: {
        borderColor: 'green40',
      },
    },
  },
};
