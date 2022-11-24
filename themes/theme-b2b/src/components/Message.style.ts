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
      color: 'gray70',
      bg: 'gray10',
    },
    title: {
      lineHeight: 'small',
      fontWeight: 'bold',
    },
    content: {
      pt: 'xsmall',
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
