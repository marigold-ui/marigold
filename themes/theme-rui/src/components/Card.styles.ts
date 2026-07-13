import { ThemeComponent, cva } from '@marigold/system';

export const Card: ThemeComponent<'Card'> = {
  container: cva({
    base: 'rounded-surface shadow-elevation-raised [--card-text:currentColor]',
    variants: {
      variant: {
        default: 'ui-surface',
        master:
          'bg-access-master/40 border border-access-master-accent [--card-text:var(--color-access-master-foreground)]',
        admin:
          'bg-access-admin/40 border border-access-admin-accent [--card-text:var(--color-access-admin-foreground)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  header: cva({}),
  title: cva({
    base: 'text-lg font-semibold leading-none text-(--card-text)',
  }),
  description: cva({
    base: 'mt-0.5 text-sm text-secondary',
  }),
  content: cva({
    base: 'text-sm',
  }),
  footer: cva({
    base: 'flex items-center gap-2',
  }),
  media: cva({}),
};
