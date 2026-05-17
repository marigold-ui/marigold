import { ThemeComponent, cva } from '@marigold/system';

export const Card: ThemeComponent<'Card'> = {
  container: cva({
    base: 'rounded-md shadow-elevation-raised',
    variants: {
      variant: {
        default: 'ui-surface',
        master: 'bg-access-master/40 border border-access-master-accent',
        admin: 'bg-access-admin/40 border border-access-admin-accent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  header: cva({
    base: 'text-lg font-semibold',
  }),
  body: cva({
    base: 'text-sm',
  }),
  footer: cva({
    base: 'flex items-center gap-2',
  }),
  media: cva({}),
};
