import { ThemeComponent, cva } from '@marigold/system';

export const Table: ThemeComponent<'Table'> = {
  table: cva('border-collapse text-sm'),
  header: cva(
    [
      'group-aria-[multiselectable]/table:[&:first-child]:w-12',
      'cursor-default border-b-[1px] p-4 text-left',
      'text-text-base border-border-base',
      'focus:outline-outline-focus',
    ],
    {
      variants: {
        variant: {
          grid: 'border-x-[1px] border-t-[1px]',
        },
        size: {
          compact: 'py-2',
          expanded: 'py-6',
        },
      },
    }
  ),
  row: cva([
    'group-aria-[multiselectable]/table:[&>*:first-child]:w-12',
    'data-[hover]:bg-bg-base-hover',
    'aria-selected:bg-bg-selected',
    'focus-visible:outline-outline-focus',
  ]),
  cell: cva(
    [
      'text-text-base border-border-base border-b-[1px] p-4',
      'focus:outline-outline-focus',
    ],
    {
      variants: {
        variant: {
          grid: 'border-x-[1px]',
        },
        size: {
          compact: 'py-2',
          expanded: 'py-6',
        },
      },
    }
  ),
};
