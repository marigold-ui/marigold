import { ThemeComponent, cva } from '@marigold/system';

export const Table: ThemeComponent<'Table'> = {
  table: cva('border-collapse whitespace-nowrap'),
  header: cva(
    [
      'group-aria-[multiselectable]/table:[&:first-child]:w-12',
      'border-x px-2 font-bold',
      'text-text-inverted bg-gray-400',
      'odd:bg-bg-accent',
      'rac-focus-visible:outline outline-2 outline-outline-focus outline-offset-1',
    ],
    {
      variants: {
        variant: {
          linedTable:
            'text-text-base border-border-inverted border-x-0 border-b bg-transparent px-2 odd:bg-transparent',
          grid: [
            'border-border-inverted border',
            'text-text-base bg-transparent px-2 odd:bg-transparent',
          ],
        },
      },
    }
  ),
  row: cva(
    [
      'group-aria-[multiselectable]/table:[&>*:first-child]:w-12',
      'selected:bg-bg-selected',
      'rac-focus-visible:outline outline-2 outline-outline-focus outline-offset-1',
    ],
    {
      variants: {
        variant: {
          linedTable: ['border-border-inverted border-b'],
          grid: ['border-border-inverted border'],
        },
      },
    }
  ),
  cell: cva(
    [
      'text-text-base p-2',
      'rac-focus-visible:outline outline-2 outline-outline-focus outline-offset-1',
    ],
    {
      variants: {
        variant: {
          grid: ['border-border-inverted border'],
        },
      },
    }
  ),
};
