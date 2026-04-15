import { cva } from '@marigold/system';
import type { ThemeComponent } from '@marigold/system';

export const Panel: ThemeComponent<'Panel'> = {
  root: cva({
    base: 'ui-surface shadow-elevation-raised',
    variants: {
      variant: {
        default: '',
        master:
          'border border-access-master-accent inset-shadow-[0_0_40px_-10px_var(--color-access-master-accent)]',
        admin:
          'border border-access-admin-accent inset-shadow-[0_0_40px_-10px_var(--color-access-admin-accent)]',
        destructive:
          'border border-destructive-accent inset-shadow-[0_0_40px_-10px_var(--color-destructive-accent)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  header: cva({}),
  title: cva({
    base: 'text-base font-semibold leading-6',
  }),
  description: cva({
    base: 'text-sm text-secondary',
  }),
  actions: cva({}),
  content: cva({}),
  collapsible: cva({}),
  collapsibleTrigger: cva({
    base: [
      'flex w-full items-center justify-between gap-4 cursor-pointer',
      'text-left text-base font-semibold leading-6',
      'hover:ui-state-hover',
      'disabled:cursor-not-allowed disabled:text-disabled',
    ],
  }),
  collapsibleContent: cva({}),
  footer: cva({}),
};
