import { tv } from 'tailwind-variants';

export const table = tv({
  slots: {
    table: ['border-collapse'],
    header: [
      'border-x border-table-header-border',
      'bg-table-header-background text-table-header-text',
      'odd:bg-table-header-alternativeBackground',
      'focus:outline-table-header-focus',
    ],
    row: [
      'hover:bg-table-row-hover checked:bg-table-row-checked focus:outline-table-row-focus',
    ],
    cell: ['p-2'],
  },
});
