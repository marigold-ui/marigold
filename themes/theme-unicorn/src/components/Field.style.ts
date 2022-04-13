import type { Theme } from '@marigold/components';
import { colors } from '../colors';

export const Field: Theme['components']['Field'] = {
  base: {
    label: {
      fontSize: 'xxsmall',
    },
    input: {
      '&:focus': {
        outline: '2px solid' + colors.blue60,
      },
    },
  },
  variant: {
    helpText: {
      description: {
        fontSize: 'xxsmall',
        fontStyle: 'italic',
        color: 'text',
      },
      error: {
        fontSize: 'xxsmall',
        fontStyle: 'italic',
        color: 'error',
      },
    },
  },
};
