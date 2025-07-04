import type { ThemeComponent } from '@marigold/system';
import { cva } from '@marigold/system';

export const Breadcrumbs: ThemeComponent<'Breadcrumbs'> = {
  container: cva(
    ['flex flex-wrap items-center gap-2 text-sm', 'text-muted-foreground'],
    {
      variants: {
        variant: {
          default: '',
          subtle: 'text-muted-foreground',
          bold: 'text-foreground font-semibold',
        },
        size: {
          small: 'text-xs gap-1.5',
          default: 'text-sm gap-2',
          large: 'text-base gap-3',
        },
      },
      defaultVariants: {
        variant: 'default',
        size: 'default',
      },
    }
  ),

  item: cva('inline-flex items-center gap-1 whitespace-nowrap'),

  link: cva('hover:underline text-link transition-colors'),

  current: cva('text-foreground font-medium'),

  separator: cva('text-muted'),

  ellipsis: cva('relative inline-block'),

  ellipsisButton: cva(
    'inline-flex items-center px-2 py-1 text-link hover:underline cursor-pointer'
  ),

  ellipsisList: cva(
    'absolute z-10 mt-2 min-w-max rounded border bg-white p-1 text-sm shadow'
  ),

  ellipsisItem: cva('px-3 py-1 hover:bg-gray-100'),

  ellipsisLink: cva('text-link hover:underline'),
};
