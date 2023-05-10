import { Theme } from '@marigold/components';

export const HelpText: Theme['components']['HelpText'] = {
  base: {
    container: {
      fontSize: 'xxsmall',
      color: 'text',
      '&:error': {
        fontSize: 'xxsmall',
        color: 'error',
      },
    },
    icon: {
      size: 'xxsmall',
    },
  },
};
