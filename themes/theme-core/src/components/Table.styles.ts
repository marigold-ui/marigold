import { ThemeComponent, cva } from '@marigold/system';

export const Table: ThemeComponent<'Table'> = {
  table: cva('border-collapse', {
    variants: {
      variant: {
        linedTable: ['border-collapse'],
        borderedTable: ['border-collapse'],
      },
    },
  }),
  header: cva(
    [
      'border-border-white border-x px-2',
      'bg-bg-surface-lowered text-text-light',
      'odd:bg-bg-surface-raised',
      'focus:outline-outline-focus',
    ],
    {
      variants: {
        variant: {
          linedTable:
            'text-text-primary border-border-neutral border-x-0 border-b bg-transparent px-2 odd:bg-transparent',
          borderedTable: [
            'border-border-neutral border',
            'text-text-primary bg-transparent px-2 odd:bg-transparent',
          ],
        },
      },
    }
  ),
  row: cva(
    'hover:bg-bg-hover-neutral selected:bg-bg-selected focus:outline-outline-focus',
    {
      variants: {
        variant: {
          linedTable: ['border-border-neutral border-b'],
          borderedTable: ['border-border-neutral border'],
        },
      },
    }
  ),
  cell: cva(['text-text-primary p-2', 'focus:outline-outline-focus'], {
    variants: {
      variant: {
        borderedTable: ['border-border-neutral border'],
      },
    },
  }),
};
