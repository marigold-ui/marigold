import { ThemeComponent } from '@marigold/system';

import { cva } from 'class-variance-authority';

export const Table: ThemeComponent<'Table'> = {
  table: cva('border-collapse text-sm'),
  header: cva(
    [
      'cursor-default border-b-[1px] p-4 text-left',
      'text-text-primary border-border-light',
      'focus:outline-outline-focus',
    ],
    {
      variants: {
        variant: {
          compact: 'py-2',
          expanded: 'py-6',
        },
      },
    }
  ),
  row: cva([
    'data-[hover]:bg-bg-hover-light',
    'aria-selected:bg-bg-selected-light',
    'focus-visible:outline-outline-focus',
  ]),
  cell: cva(
    [
      'text-text-primary border-border-light border-b-[1px] p-4',
      'focus:outline-outline-focus',
    ],
    {
      variants: {
        variant: {
          compact: 'py-2',
          expanded: 'py-6',
        },
      },
    }
  ),
};
