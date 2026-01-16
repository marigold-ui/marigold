import { cva } from '@marigold/system';
import type { ThemeComponent } from '@marigold/system';

export const Card: ThemeComponent<'Card'> = cva(['p-4 rounded-md'], {
  variants: {
    variant: {
      default: 'ui-surface shadow-elevation-base',
      master: 'bg-access-master/30 border border-access-master',
      admin: 'bg-access-admin/30 border border-access-admin',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
