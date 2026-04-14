import { ThemeComponent, cva } from '@marigold/system';

export const Card: ThemeComponent<'Card'> = {
  container: cva({
    base: 'rounded-md shadow-elevation-raised overflow-hidden',
    variants: {
      variant: {
        default: 'ui-surface',
        master: 'bg-access-master/30 border border-access-master',
        admin: 'bg-access-admin/30 border border-access-admin',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  header: cva({
    base: 'px-4 pt-4 pb-2 text-lg font-semibold',
  }),
  body: cva({
    base: 'px-4 py-2 text-sm',
  }),
  footer: cva({
    base: 'flex items-center justify-end gap-2 px-4 pt-2 pb-4',
  }),
  preview: cva({
    base: '',
  }),
};
