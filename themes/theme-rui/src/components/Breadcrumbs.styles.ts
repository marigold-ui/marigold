import type { ThemeComponent } from '@marigold/system';
import { cva } from '@marigold/system';

export const Breadcrumbs: ThemeComponent<'Breadcrumbs'> = {
  container: cva(['flex flex-wrap items-center'], {
    variants: {
      variant: {
        default: 'text-foreground',
      },
      size: {
        small: 'text-xs gap-1.5',
        default: 'text-sm gap-1.5',
        large: 'text-base gap-1.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }),
  item: cva('inline-flex items-center gap-1.5 whitespace-nowrap '),
  link: cva('hover:underline cursor-pointer'),
  current: cva('font-medium'),
};
