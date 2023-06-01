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
      'border-x border-table-header-border px-2',
      'bg-table-header-background text-table-header-text',
      'odd:bg-table-header-alternativeBackground',
      'focus:outline-table-header-focus',
    ],
    {
      variants: {
        variant: {
          linedTable:
            'text-table-header-alternativText px-2 bg-transparent odd:bg-transparent border-x-0 border-b border-table-header-alternativBorder',
          borderedTable: [
            'border-table-header-alternativBorder border',
            'text-table-header-alternativText px-2 bg-transparent odd:bg-transparent',
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
          linedTable: ['border-b border-table-row-border'],
          borderedTable: ['border-table-row-border border'],
        },
      },
    }
  ),
  cell: cva(['p-2 text-table-cell-text', 'focus:outline-table-cell-focus'], {
    variants: {
      variant: {
        borderedTable: ['border-table-cell-border border'],
      },
    },
  }),
};
