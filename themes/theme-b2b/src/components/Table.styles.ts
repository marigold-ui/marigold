import { ThemeComponent, cva } from '@marigold/system';

export const Table: ThemeComponent<'Table'> = {
  table: cva('border-collapse bg-white text-sm'),
  header: cva(
    [
      'group-aria-[multiselectable]/table:[&:first-child]:w-12',
      'cursor-default  p-4 text-left',
      'text-text-body',
      'after:bg-bg-surface-raised after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:content-[""]',
      'focus:outline-outline-focus',
      'bg-white',
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
    'data-[hover]:bg-bg-hover-light',
    'aria-selected:bg-bg-selected',
    'focus-visible:outline-outline-focus',
  ]),
  cell: cva(
    [
      'text-text-body border-border-light border-b-[1px] p-4',
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
