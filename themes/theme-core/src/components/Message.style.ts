import type { Theme } from '@marigold/components';

export const Message: Theme['components']['Message'] = {
  base: {
    container: {
      border: '1px solid',
      pt: 'xsmall',
      pb: 'small',
      px: 'small',
      fontSize: 'xxsmall',
      bg: 'gray10',
    },
    title: {
      lineHeight: 'large',
    },
    content: {
      lineHeight: 'small',
    },
    icon: {
      display: 'flex',
      alignItems: 'center',
      size: 16,
    },
  },
  variant: {
    warning: {
      container: {
        borderColor: 'warning',
      },
      icon: {
        color: 'warning',
      },
      content: {
        color: 'warning',
      },
      title: {
        color: 'warning',
      },
    },
    error: {
      container: {
        borderColor: 'error',
      },
      icon: {
        color: 'error',
      },
      content: {
        color: 'error',
      },
      title: {
        color: 'error',
      },
    },
    info: {
      container: {
        borderColor: 'info',
      },
      icon: {
        color: 'info',
      },
      content: {
        color: 'info',
      },
      title: {
        color: 'info',
      },
    },
  },
};
