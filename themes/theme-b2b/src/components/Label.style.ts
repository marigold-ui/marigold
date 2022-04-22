import { Theme } from '@marigold/components';

export const Label: Theme['components']['Label'] = {
  base: {
    fontSize: 'xxsmall',
    color: 'text',
    '&:disabled': {
      color: 'gray40',
    },
  },
};
