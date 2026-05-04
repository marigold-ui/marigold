import { type ThemeComponent, cva } from '@marigold/system';

export const Description: ThemeComponent<'Description'> = cva({
  base: 'text-secondary',
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});
