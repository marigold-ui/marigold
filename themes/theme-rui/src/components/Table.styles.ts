import { ThemeComponent, cva } from '@marigold/system';

export const Table: ThemeComponent<'Table'> = {
  table: cva('text-sm'),
  headerRow: cva('border-border border-b', {
    variants: {
      variant: {
        default: '',
        grid: '[&>:not(:last-child)]:border-r [&>:not(:last-child)]:border-border',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  header: cva([
    'h-12 px-3 align-middle font-medium text-muted-foreground last:text-right',
    // does this checkbox think work?
    '[&:has([role=checkbox])]:w-px [&:has([role=checkbox])]:pr-0',
  ]),
  body: cva('[&_tr:last-child]:border-0'),
  row: cva(
    [
      'border-b border-border transition-colors',
      // does this selected think work?
      'data-[state=selected]:bg-muted hover:bg-transparent',
    ],
    {
      variants: {
        variant: {
          default: '',
          grid: '[&>:not(:last-child)]:border-r [&>:not(:last-child)]:border-border',
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    }
  ),
  cell: cva([
    'p-3 align-middle last:text-right',
    // does this checkbox think work?
    '[&:has([role=checkbox])]:pr-0',
  ]),
};
