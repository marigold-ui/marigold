import { cva } from '@marigold/system';
import type { ThemeComponent } from '@marigold/system';

export const Card: ThemeComponent<'Card'> = cva(['p-4 rounded-md'], {
  variants: {
    variant: {
      default: 'surface elevation-raised',
      master: 'rounded-md bg-access-master/30 p-4 border border-access-master',
      admin: 'rounded-md bg-access-admin/30 p-4 border border-access-admin',
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
