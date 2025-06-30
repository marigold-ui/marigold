import { cva } from '@marigold/system';
import type { ThemeComponent } from '@marigold/system';

export const Card: ThemeComponent<'Card'> = cva(
  ['p-4 rounded-md', 'util-surface-raised'],
  {
    variants: {
      size: {
        default: '',
        full: 'w-full',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);
