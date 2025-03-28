import { ThemeComponent, cva } from '@marigold/system';

export const Table: ThemeComponent<'Table'> = {
  table: cva('border-collapse whitespace-nowrap'),
  headerRow: cva(),
  thead: cva(),
  header: cva(
    [
      'group-aria-[multiselectable]/table:first:w-12',
      'border-x px-2 font-bold',
      'text-text-inverted bg-gray-400',
      'odd:bg-bg-accent',
      'focus:outline-outline-focus outline-offset-1',
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
  body: cva(),
  row: cva(
    [
      'group-aria-[multiselectable]/table:[&>*:first-child]:w-12',
      'focus:outline-2 outline-outline-focus outline-offset-1',
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
      'focus:outline-2 outline-outline-focus outline-offset-1',
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
