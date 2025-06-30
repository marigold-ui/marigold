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

  item: cva('inline-flex items-center gap-1'),

  link: cva('hover:underline text-link transition-colors'),

  current: cva('text-foreground font-medium'),

  separator: cva('text-muted'),

  ellipsis: cva(
    'text-muted size-5 flex items-center justify-center cursor-default'
  ),
};
