import { cva } from '@marigold/system';
import type { ThemeComponent } from '@marigold/system';

export const Button: ThemeComponent<'Button'> = cva(
  [
    'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors outline-offset-2 focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-brand text-brand-foreground shadow-sm shadow-black/5 hover:bg-primary/90',

        destructive: 'bg-destructive text-destructive-foreground',
      },
    },
  }
);
