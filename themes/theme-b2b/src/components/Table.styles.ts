import { ThemeComponent, cva } from '@marigold/system';

export const Table: ThemeComponent<'Table'> = {
  table: cva('border-collapse whitespace-nowrap bg-white text-sm'),
  header: cva(
    [
      'relative ',
      'group-aria-[multiselectable]/table:[&:first-child]:w-12',
      'cursor-default p-4',
      'text-text-base',
      'after:border-border-base after:absolute after:bottom-0 after:left-0 after:z-[-1] after:size-full after:border-b after:border-solid after:content-[""]',
      'focus:outline-outline-focus',
      'bg-white',
    ],
    {
      variants: {
        variant: {
          grid: 'border-border-base border',
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
      'text-text-base border-border-base border-b p-4',
      'focus:outline-outline-focus',
    ],
    {
      variants: {
        variant: {
          grid: 'border-x',
        },
        size: {
          compact: 'py-2',
          expanded: 'py-6',
        },
      },
    }
  ),
};
