import { cva } from '@marigold/system';
import type { ThemeComponent } from '@marigold/system';

export const Panel: ThemeComponent<'Panel'> = {
  root: cva({
    base: 'rounded-surface shadow-elevation-raised [--panel-accent:currentColor]',
    variants: {
      variant: {
        default: 'ui-surface',
        master:
          'border border-access-master-accent bg-access-master/40 [--panel-accent:var(--color-access-master-foreground)]',
        admin:
          'border border-access-admin-accent bg-access-admin/40 [--panel-accent:var(--color-access-admin-foreground)]',
        destructive:
          'border border-destructive-accent bg-destructive/40 [--panel-accent:var(--color-destructive-foreground)]',
      },
      size: {
        default: '',
        form: 'max-w-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }),
  header: cva({}),
  title: cva({
    base: 'text-lg font-semibold leading-none text-(--panel-accent)',
  }),
  description: cva({
    base: 'mt-0.5 text-sm text-secondary',
  }),
  actions: cva({}),
  content: cva({}),
  collapsible: cva({ base: 'border-t border-border' }),
  collapsibleHeader: cva({
    base: [
      'flex items-center gap-4',
      'm-1 rounded-[calc(var(--radius-surface)-var(--spacing))]',
      'px-[calc(var(--panel-px)-var(--spacing))] py-[calc(var(--panel-py)-var(--spacing))]',
      'text-left cursor-pointer',
      'hover:ui-state-hover',
      'focus-visible:ui-state-focus outline-none',
      'disabled:cursor-not-allowed disabled:text-disabled',
    ],
  }),
  collapsibleTitle: cva({
    base: 'block text-base font-medium leading-none',
  }),
  collapsibleDescription: cva({
    base: 'mt-0.5 block text-sm text-secondary',
  }),
  collapsibleContent: cva({
    base: 'overflow-clip h-(--disclosure-panel-height) transition-[height] duration-250',
  }),
  footer: cva({}),
};
