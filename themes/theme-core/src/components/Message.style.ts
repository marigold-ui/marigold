import type { Theme } from '@marigold/components';

export const Message: Theme['components']['Message'] = {
  base: {
    container: {
      borderStyle: 'solid',
      borderWidth: '2px 2px 2px 16px',
      pt: 'xsmall',
      pb: 'small',
      px: 'small',
      fontSize: 'xxsmall',
      bg: 'gray10',
    },
    title: {
      lineHeight: 'large',
      fontWeight: 'bold',
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
    },
    error: {
      container: {
        borderColor: 'error',
      },
      icon: {
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
    },
  },
};
