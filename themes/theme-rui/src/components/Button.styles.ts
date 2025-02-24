import type { ThemeComponent } from '@marigold/system';
import { cva } from '@marigold/system';

export const Button: ThemeComponent<'Button'> = cva(
  [
    'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors outline-hidden',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    'focus-visible:outline-offset-2 focus-visible:outline focus-visible:outline-ring/70',
    'h-button px-4 py-2',
    'disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled-foreground disabled:border-none disabled:cursor-not-allowed',
    'pending:text-disabled-foreground pending:bg-disabled pending:cursor-not-allowed pending:border-none',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-brand text-brand-foreground shadow-sm shadow-black/5 hover:bg-brand/90',
        secondary:
          'border border-border bg-background shadow-sm shadow-black/5 hover:bg-accent hover:text-foreground',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-accent hover:text-foreground',
      },
    },
    defaultVariants: {
      variant: 'secondary',
    },
  }
);
