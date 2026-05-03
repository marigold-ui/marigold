import { type ThemeComponent, cva } from '@marigold/system';

export const Description: ThemeComponent<'Description'> = cva({
  variants: {
    variant: {
      default: 'text-secondary',
      muted: 'text-tertiary',
    },
    size: {
      default: '',
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});
