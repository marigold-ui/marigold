import { cva } from '@marigold/system';
import type { ThemeComponent } from '@marigold/system';

export const Card: ThemeComponent<'Card'> = cva(['p-4 rounded-md'], {
  variants: {
    variant: {
      default: 'util-surface-raised',
      master: 'bg-access-master',
      admin: 'bg-access-admin',
    },
    size: {
      default: '',
      full: 'w-full',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});
