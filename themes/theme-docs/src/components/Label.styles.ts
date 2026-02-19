import { ThemeComponent, cva } from '@marigold/system';

export const Label: ThemeComponent<'Label'> = cva({
  base: '',
  variants: {
    variant: {
      default: '',
      floating: [
        'z-10 col-start-1 row-start-1',
        'pointer-events-none',
        'text-secondary-400 text-nowrap',
        'after:content-[":"]',
      ],
    },
    size: {
      default: 'text-sm',
      small: 'text-xs',
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
      className: 'pl-4',
    },
    {
      variant: 'floating',
      size: 'small',
      className: 'pl-3',
    },
  ],
});
