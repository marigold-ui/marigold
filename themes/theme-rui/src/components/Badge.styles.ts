import { type ThemeComponent, cva } from '@marigold/system';

export const Badge: ThemeComponent<'Badge'> = cva({
  base: [
    'inline-flex items-center justify-center rounded-full px-2 text-xs font-medium leading-normal transition-colors',
    'focus-visible:ui-state-focus outline-none',
    'has-[svg]:gap-1',
  ],
  variants: {
    variant: {
      default: 'bg text-foreground border border-border',
      primary: 'bg-primary text-primary-foreground ',
      success: 'bg-success text-success-foreground',
      warning: 'bg-warning text-warning-foreground',
      info: 'bg-info text-info-foreground',
      error: 'bg-destructive text-destructive-foreground',
      admin:
        'text-access-admin-foreground border border-access-admin-foreground bg-surface',
      master:
        'text-access-master-foreground border border-access-master-foreground bg-surface',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
