import type { Theme } from '@marigold/components';

export const Message: Theme['components']['Message'] = {
  base: {
    container: {
      borderStyle: 'solid',
      borderWidth: '2px 2px 2px 16px',
      px: 'medium-1',
      py: 'small-1',
      bg: 'info.background',
    },
    title: {
      lineHeight: 'medium-1',
      fontWeight: 'bold',
      fontFamily: 'headline',
    },
    content: {
      lineHeight: 'small-1',
    },
    icon: {
      display: 'flex',
      alignItems: 'center',
      size: 16,
    },
  },
  variant: {
    info: {
      container: {
        borderColor: 'info.base',
        color: 'info.text',
      },
      title: {
        color: 'info.text',
      },
      icon: {
        color: 'info.base',
      },
    },
  },
};
