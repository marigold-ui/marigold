import type { Theme } from '@marigold/components';

export const Message: Theme['components']['Message'] = {
  base: {
    container: {
      borderStyle: 'solid',
      borderWidth: '2px 2px 2px 16px',
      padding: '8px 16px 16px',
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
        borderColor: 'yellow.base',
      },
      icon: {
        color: 'yellow.base',
      },
    },
  },
};
