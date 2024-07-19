import { ThemeComponent, cva } from '@marigold/system';

import { xSpacing } from './Input.styles';

export const Label: ThemeComponent<'Label'> = {
  container: cva('', {
    variants: {
      variant: {
        default: '',
        floating: [
          'pointer-events-none z-10 col-span-full row-start-1 row-end-1',
          'text-secondary-400 text-nowrap text-sm',
        ],
      },
      size: {
        default: '',
        small: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
    compoundVariants: [
      {
        variant: 'floating',
        size: 'default',
        className: [xSpacing.default, 'pt-2'],
      },
    ],
  }),
  indicator: cva(),
};
