import { tv, type TVReturnType } from 'tailwind-variants';
export const table: TVReturnType<any, any, any, any, any, any> = tv({
  slots: {
    table: ['border-collapse'],
    header: [
      'border-x border-table-header-border px-2',
      'bg-table-header-background text-table-header-text',
      'odd:bg-table-header-alternativeBackground',
      'focus:outline-table-header-focus',
    ],
    row: 'hover:bg-table-row-hover selected:bg-table-row-checked focus:outline-table-row-focus',

    cell: ['p-2 text-table-cell-text', 'focus:outline-table-cell-focus'],
  },
  variants: {
    variant: {
      lines: {
        table: ['border-collapse'],
        header: [
          'text-table-header-alternativText px-2 bg-transparent odd:bg-transparent border-x-0 border-b border-table-header-alternativBorder',
        ],
        row: ['border-b border-table-row-border'],
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
