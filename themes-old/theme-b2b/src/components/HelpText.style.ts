import { Theme } from '@marigold/components';

export const HelpText: Theme['components']['HelpText'] = {
  base: {
    container: {
      fontSize: 'xxsmall',
      color: 'text',
      '&:error': {
        color: 'error',
      },
    },
    icon: {
      size: 'xxsmall',
    },
  },
};
