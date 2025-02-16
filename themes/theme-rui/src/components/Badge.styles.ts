import { type ThemeComponent, cva } from '@marigold/system';

export const Badge: ThemeComponent<'Badge'> = cva(
  [
    'inline-flex items-center justify-center rounded-full border px-1.5 text-xs font-medium leading-normal transition-colors',
    // TODO: Make focus style be a utility or something?
    'outline-offset-2 focus-visible:outline-2 focus-visible:outline-ring/70',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-brand text-brand-foreground border-transparent',
        secondary: 'border-border',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);
