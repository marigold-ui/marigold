import { ThemeComponent, cva } from '@marigold/system';

export const Divider: ThemeComponent<'Divider'> = cva({
  base: 'bg-border h-px w-full',
  variants: {
    variant: {
      default: '',
      bold: 'h-0.5',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
