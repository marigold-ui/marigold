import { ThemeComponent, cva } from '@marigold/system';

export const Table: ThemeComponent<'Table'> = {
  table: cva(
    'text-sm [&_td]:border-border [&_th]:border-border border-separate border-spacing-0 [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b',
    {
      variants: {
        variant: {
          default: '',
          grid: '',
        },
      },
    }
  ),
  thead: cva(
    // for sticky header
    'bg-background/90 top-0 z-1 backdrop-blur-xs ',
    {
      variants: {
        variant: {
          default: '',
          grid: '',
        },
      },
    }
  ),
  headerRow: cva(['border-border border-b'], {
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
  header: cva(
    [
      'h-12 px-3 align-middle font-medium text-muted-foreground last:text-right',
      'focus-visible:outline-2 outline-offset-2 outline-ring/70',
    ],
    {
      variants: {
        variant: {
          default: '[&:has([type=checkbox])]:pr-0',
          grid: '',
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    }
  ),
  body: cva('[&_tr:last-child]:border-0'),
  row: cva(
    [
      'border-b border-border transition-colors',
      'focus-visible:outline-2 outline-offset-2 outline-ring/70',
      'aria-[selected=true]:bg-muted hover:bg-transparent data-disabled:cursor-not-allowed',
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
  cell: cva(
    [
      'p-3 align-middle last:text-right',
      'focus-visible:outline-2 outline-offset-2 outline-ring/70',
    ],
    {
      variants: {
        variant: {
          default: '[&:has([type=checkbox])]:pr-0',
          grid: '',
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    }
  ),
};
