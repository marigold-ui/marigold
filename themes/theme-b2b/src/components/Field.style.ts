import { Theme } from '@marigold/components';
import { colors } from '../colors';

export const Field: Theme['components']['Field'] = {
  base: {
    label: {
      fontSize: 'xxsmall',
      color: 'text',
    },
    input: {
      '&:focus': {
        outline: '2px solid' + colors.blue60,
      },
    },
    helpText: {
      fontSize: 'xxsmall',
      color: 'text',
      '&:invalid': {
        fontSize: 'xxsmall',
        color: 'error',
      },
    },
  },
};
