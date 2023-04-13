import { tv } from 'tailwind-variants';

export const table = tv({
  slots: {
    table: ['border-collapse'],
    header: [
      'border-x border-table-header-border px-2',
      'bg-table-header-background text-table-header-text',
      'odd:bg-table-header-alternativeBackground',
      'focus:outline-table-header-focus',
    ],
    row: [
      'hover:bg-table-row-hover checked:bg-table-row-checked focus:outline-table-row-focus',
    ],
    cell: ['p-2 text-table-cell-text', 'focus:outline-table-cell-focus'],
  },
  variants: {
    variant: {
      lines: {
        table: ['border-collapse'],
        header: [
          'text-table-header-alternativText px-2 bg-transparent odd:bg-transparent',
        ],
        row: ['border-b'],
      },
      borders: {
        table: ['border-collapse'],
        header: [
          'border-table-header-alternativBorder border',
          'text-table-header-alternativText px-2 bg-transparent odd:bg-transparent',
        ],
        row: ['border-table-row-border border'],
        cell: ['border-table-cell-border border'],
      },
    },
  },
});
