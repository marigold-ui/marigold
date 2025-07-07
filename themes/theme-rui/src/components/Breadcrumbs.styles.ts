import type { ThemeComponent } from '@marigold/system';
import { cva } from '@marigold/system';

export const Breadcrumbs: ThemeComponent<'Breadcrumbs'> = {
  container: cva(['flex flex-wrap items-center'], {
    variants: {
      variant: {
        default: 'text-foreground',
      },
      size: {
        small: 'text-xs gap-1',
        default: 'text-sm gap-1',
        large: 'text-base gap-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }),

  item: cva('inline-flex items-center gap-1 whitespace-nowrap'),

  link: cva('hover:underline text-foreground'),

  current: cva('font-medium'),

  ellipsis: cva('relative inline-block'),

  ellipsisButton: cva('inline-flex items-center px-2 py-1 cursor-pointer'),

  ellipsisList: cva(
    'absolute z-10 mt-2 min-w-max rounded border bg-white p-1 text-sm shadow'
  ),

  ellipsisItem: cva('px-3 py-1 hover:bg-gray-100'),
};
