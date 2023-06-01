import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

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
      'border-table-header-border border-x px-2',
      'bg-table-header-background text-table-header-text',
      'odd:bg-table-header-alternativeBackground',
      'focus:outline-table-header-focus',
    ],
    {
      variants: {
        variant: {
          linedTable:
            'text-table-header-alternativText border-table-header-alternativBorder border-x-0 border-b bg-transparent px-2 odd:bg-transparent',
          borderedTable: [
            'border-table-header-alternativBorder border',
            'text-table-header-alternativText bg-transparent px-2 odd:bg-transparent',
          ],
        },
      },
    }
  ),
  row: cva(
    'hover:bg-table-row-hover selected:bg-table-row-checked focus:outline-table-row-focus',
    {
      variants: {
        variant: {
          linedTable: ['border-table-row-border border-b'],
          borderedTable: ['border-table-row-border border'],
        },
      },
    }
  ),
  cell: cva(['text-table-cell-text p-2', 'focus:outline-table-cell-focus'], {
    variants: {
      variant: {
        borderedTable: ['border-table-cell-border border'],
      },
    },
  }),
};
