import { type ThemeComponent, cva } from '@marigold/system';

export const Badge: ThemeComponent<'Badge'> = cva({
  base: [
    'inline-flex items-center justify-center rounded-full px-2 text-xs font-medium leading-normal transition-colors',
    'focus-visible:state-focus outline-none',
    'has-[svg]:gap-1',
  ],
  variants: {
    variant: {
      default: 'bg-muted text-foreground border border-border',
      primary: 'bg-brand text-brand-foreground ',
      success: 'bg-success-muted text-success-muted-foreground',
      warning: 'bg-warning-muted text-warning-muted-foreground',
      info: 'bg-info-muted text-info-muted-foreground',
      error: 'bg-destructive-muted text-destructive-muted-foreground',
      admin:
        'text-access-admin-foreground border border-access-admin-foreground bg-background',
      master:
        'text-access-master-foreground border border-access-master-foreground bg-background',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
