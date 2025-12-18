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
        muted: 'bg-muted',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  header: cva(
    [
      'h-12 px-3 align-middle font-medium text-muted-foreground',
      'focus-visible:outline-2 outline-offset-2 outline-ring/70',
    ],
    {
      variants: {
        variant: {
          default: '[&:has([type=checkbox])]:pr-0',
          grid: '',
          muted: 'border-t',
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    }
  ),
  body: cva('[&_tr:last-child]:border-0 bg-background'),
  row: cva(
    [
      'border-b border-border transition-colors',
      'focus-visible:outline-2 outline-offset-2 outline-ring/70',
      'data-disabled:cursor-not-allowed',
    ],
    {
      variants: {
        variant: {
          default: 'aria-[selected=true]:bg-muted',
          grid: 'aria-[selected=true]:bg-muted [&>:not(:last-child)]:border-r [&>:not(:last-child)]:border-border',
          admin: [
            'bg-access-admin',
            '[&_td:first-child]:relative [&_td:first-child]:pl-4',
            '[&_td:first-child:before]:content-[""] [&_td:first-child:before]:absolute [&_td:first-child:before]:top-0 [&_td:first-child:before]:bottom-0 [&_td:first-child:before]:left-0 [&_td:first-child:before]:w-1',
            '[&_td:first-child:before]:bg-access-admin-foreground',
          ],
          master: [
            'bg-access-master',
            '[&_td:first-child]:relative [&_td:first-child]:pl-4',
            '[&_td:first-child:before]:content-[""] [&_td:first-child:before]:absolute [&_td:first-child:before]:top-0 [&_td:first-child:before]:bottom-0 [&_td:first-child:before]:left-0 [&_td:first-child:before]:w-1',
            '[&_td:first-child:before]:bg-access-master-foreground',
          ],
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    }
  ),
  cell: cva('p-3 focus-visible:outline-2 outline-offset-2 outline-ring/70', {
    variants: {
      variant: {
        default: '[&:has([type=checkbox])]:pr-0',
        grid: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
};
