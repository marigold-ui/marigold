import { Theme } from '@marigold/components';

export const DatePicker: Theme['components']['DatePicker'] = {
  base: {
    actionButton: {
      '& button': {
        borderTopRightRadius: '10px',
        borderBottomRightRadius: '10px',
      },
      '&[data-focus] button': {
        bg: 'gray80',
        '& svg': {
          color: '#fff',
        },
      },
    },
  },
};
