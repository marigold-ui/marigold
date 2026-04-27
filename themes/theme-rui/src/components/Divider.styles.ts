import { ThemeComponent, cva } from '@marigold/system';

export const Divider: ThemeComponent<'Divider'> = cva({
  base: 'bg-border',
  variants: {
    variant: {
      default: '',
      bold: 'h-0.5 w-0.5',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
