import { cva } from '@marigold/system';
import type { ThemeComponent } from '@marigold/system';

export const Panel: ThemeComponent<'Panel'> = {
  root: cva({
    base: 'rounded-surface shadow-elevation-raised [--panel-accent:currentColor]',
    variants: {
      variant: {
        default: 'ui-surface',
        master:
          'border border-access-master-accent bg-access-master/10 [--panel-accent:var(--color-access-master-foreground)]',
        admin:
          'border border-access-admin-accent bg-access-admin/10 [--panel-accent:var(--color-access-admin-foreground)]',
        destructive:
          'border border-destructive-accent bg-destructive/10 [--panel-accent:var(--color-destructive-foreground)]',
      },
      size: {
        form: 'max-w-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  header: cva({}),
  title: cva({
    base: 'text-base font-semibold leading-6 text-(--panel-accent)',
  }),
  description: cva({
    base: 'text-sm text-secondary',
  }),
  actions: cva({}),
  content: cva({}),
  collapsible: cva({ base: 'border-t border-border' }),
  collapsibleTrigger: cva({
    base: [
      'flex flex-1 items-center justify-between gap-4 cursor-pointer',
      'm-1 rounded-[calc(var(--radius-surface)-var(--spacing))]',
      'px-[calc(var(--panel-px)-var(--spacing))] py-[calc(var(--panel-py)-var(--spacing))]',
      'text-left text-base font-medium leading-6',
      'hover:ui-state-hover',
      'disabled:cursor-not-allowed disabled:text-disabled',
    ],
  }),
  collapsibleContent: cva({
    base: 'overflow-clip h-(--disclosure-panel-height) transition-[height] duration-250',
  }),
  footer: cva({}),
};
