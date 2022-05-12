import { Theme } from '@marigold/components';

const arrowSize = 8;

export const Tooltip: Theme['components']['Tooltip'] = {
  base: {
    container: {
      fontSize: 'xxsmall',
      lineHeight: 'small',

      border: '1px solid',
      borderColor: 'blue70',
      borderRadius: 'large',
      bg: 'blue10',

      p: 'xsmall',

      '&[data-placement="top"]': {
        mb: arrowSize,
      },

      '&[data-placement="right"]': {
        ml: arrowSize,
      },

      '&[data-placement="bottom"]': {
        mt: arrowSize,
      },

      '&[data-placement="left"]': {
        mr: arrowSize,
      },
    },

    arrow: {
      borderWidth: arrowSize,
      borderTopColor: 'blue70',

      '[data-placement="right"] &, [data-placement="left"] &': {
        top: '50%',
        mt: `-${arrowSize}px`,
      },

      '[data-placement="top"] &, [data-placement="bottom"] &': {
        ml: `-${arrowSize}px`,
      },

      '[data-placement="top"] & ': {
        top: '100%',
      },

      '[data-placement="right"] &': {
        right: '100%',
        transform: 'rotate(90deg)',
      },

      '[data-placement="bottom"] & ': {
        bottom: '100%',
        transform: 'rotate(180deg)',
      },

      '[data-placement="left"] &': {
        left: '100%',
        transform: 'rotate(270deg)',
      },
    },
  },
};
