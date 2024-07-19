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
        small: 'size-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }),
  select: cva([inputBox, inputBackground, 'outline-none'], {
    variants: {
      variant: {
        default: 'gap-2',
        floating: 'col-span-full row-start-1 row-end-2 shadow shadow-black/20',
      },
      size: {
        default: [inputSpacing.default],
        small: [inputSpacing.small, 'text-sm'],
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
      {
        variant: 'floating',
        size: 'small',
        className: 'h-12 py-1 [&>span]:self-end',
      },
    ],
  }),
};
