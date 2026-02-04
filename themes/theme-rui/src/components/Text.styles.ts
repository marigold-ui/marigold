import { type ThemeComponent, cva } from '@marigold/system';

export const Text: ThemeComponent<'Text'> = cva({
  variants: {
    variant: {
      default: '',
      muted: 'text-muted-foreground',
    },
    size: {
      // Adding a default here, which beasically acts as an inherit
      default: '',
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
      '7xl': 'text-7xl',
      '8xl': 'text-8xl',
      '9xl': 'text-9xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});
