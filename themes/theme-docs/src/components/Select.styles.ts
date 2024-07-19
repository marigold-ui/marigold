import { ThemeComponent, cva } from '@marigold/system';

import { inputBackground, inputBox, inputSpacing } from './Input.styles';

export const Select: ThemeComponent<'Select'> = {
  icon: cva('text-secondary-400', {
    variants: {
      variant: {
        default: '',
        floating: '',
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
      // {
      //   variant: 'floating',
      //   size: 'default',
      //   // offset the icon to center it
      //   className: '-mt-3',
      // },
    ],
  }),
  select: cva([inputBox, inputBackground, 'outline-none'], {
    variants: {
      variant: {
        default: 'gap-2',
        floating: 'col-span-full row-start-1 row-end-2',
      },
      size: {
        default: [inputSpacing.default],
        small: [inputSpacing.small],
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
        className: 'h-14 py-1 [&>span]:self-end',
      },
    ],
  }),
};
