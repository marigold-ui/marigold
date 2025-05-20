import { type ThemeComponent, cva } from '@marigold/system';

export const Badge: ThemeComponent<'Badge'> = cva(
  [
    'inline-flex items-center justify-center rounded-full px-2 text-xs font-medium leading-normal transition-colors',
    'focus-visible:util-focus-ring outline-none',
  ],
  {
    variants: {
      variant: {
        default: 'bg-muted text-foreground',
        primary: 'bg-brand text-brand-foreground ',
        success: ['bg-success-muted text-success-muted-foreground'],
        warning: ['bg-warning-muted text-warning-muted-foreground'],
        info: ['bg-info-muted text-info-muted-foreground'],
        error: ['bg-destructive-muted text-destructive-muted-foreground'],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
