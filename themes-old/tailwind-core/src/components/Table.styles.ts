import { tv, type TVReturnType } from 'tailwind-variants';
export const table: TVReturnType<any, any, any, any, any, any> = tv({
  slots: {
    table: ['border-collapse'],
    header: [
      'border-table-header-border border-x px-2',
      'bg-table-header-background text-table-header-text',
      'odd:bg-table-header-alternativeBackground',
      'focus:outline-table-header-focus',
    ],
    row: 'hover:bg-table-row-hover selected:bg-table-row-checked focus:outline-table-row-focus',

    cell: ['text-table-cell-text p-2', 'focus:outline-table-cell-focus'],
  },
  variants: {
    variant: {
      lines: {
        table: ['border-collapse'],
        header: [
          'text-table-header-alternativText border-table-header-alternativBorder border-x-0 border-b bg-transparent px-2 odd:bg-transparent',
        ],
        row: ['border-table-row-border border-b'],
      },
      borders: {
        table: ['border-collapse'],
        header: [
          'border-table-header-alternativBorder border',
          'text-table-header-alternativText bg-transparent px-2 odd:bg-transparent',
        ],
        row: ['border-table-row-border border'],
        cell: ['border-table-cell-border border'],
      },
    },
  },
});
