import { cva } from '@marigold/system';
import type { ThemeComponent } from '@marigold/system';

export const Card: ThemeComponent<'Card'> = cva({
  base: ['p-4 rounded-md shadow-elevation-raised'],
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
});
