import { type ThemeComponent, cva } from '@marigold/system';

const circle = 'before:size-1.5 before:rounded-full';

export const Badge: ThemeComponent<'Badge'> = cva(
  [
    'inline-flex items-center justify-center rounded-full border px-1.5 text-xs font-medium leading-normal transition-colors',
    // TODO: Make focus style be a utility or something?
    'outline-offset-2 focus-visible:outline-2 outline-ring/70',
  ],
  {
    variants: {
      variant: {
        default: 'border-border bg-white',
        primary: 'bg-brand text-brand-foreground border-transparent',
        success: ['bg-white border-success before:bg-success gap-1.5', circle],
        warning: ['bg-white border-warning before:bg-warning gap-1.5', circle],
        info: ['bg-white border-info before:bg-info gap-1.5', circle],
        error: [
          'bg-white border-destructive before:bg-destructive gap-1.5',
          circle,
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
