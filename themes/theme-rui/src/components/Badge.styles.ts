import { type ThemeComponent, cva } from '@marigold/system';

const circle = 'before:size-1.5 before:rounded-full pr-2';

export const Badge: ThemeComponent<'Badge'> = cva(
  [
    'inline-flex items-center justify-center rounded-full border px-1.5 text-xs font-medium leading-normal transition-colors',
    'mixin-ring-focus-visible',
  ],
  {
    variants: {
      variant: {
        default: 'border-border bg-white',
        primary: 'bg-brand text-brand-foreground border-transparent',
        success: [
          'bg-success-muted text-success-muted-foreground border-success-muted-accent before:bg-success-muted-accent gap-1.5',
          circle,
        ],
        warning: [
          'bg-warning-muted text-warning-muted-foreground border-warning-muted-accent before:bg-warning-muted-accent gap-1.5',
          circle,
        ],
        info: [
          'bg-info-muted text-info-muted-foreground border-info-muted-accent before:bg-info-muted-accent gap-1.5',
          circle,
        ],
        error: [
          'bg-destructive-muted text-destructive-muted-foreground border-destructive-muted-accent before:bg-destructive-muted-accent gap-1.5',
          circle,
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
