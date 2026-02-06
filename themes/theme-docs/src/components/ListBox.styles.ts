import { ThemeComponent, cva } from '@marigold/system';

export const ListBox: ThemeComponent<'ListBox'> = {
  container: cva([
    'bg-bg-surface-overlay border-border rounded-sm border drop-shadow-lg',
    'w-full',
    // In a Tray
    'group-[[role=dialog]]/tray:border-0 group-[[role=dialog]]/tray:shadow-none group-[[role=dialog]]/tray:drop-shadow-none',
  ]),
  list: cva([
    'outline-hidden',
    'p-1',
    'sm:max-h-[45vh] md:max-h-[75vh] lg:max-h-[75vh]',
  ]),
  item: cva(
    [
      'text-text-primary',
      'cursor-pointer rounded-xs outline-hidden',
      'hover:bg-bg-hover focus:bg-bg-hover',
      'aria-selected:bg-bg-hover',
    ],
    {
      variants: {
        size: {
          default: 'p-2',
          small: 'px-2 py-1 text-sm',
        },
      },
      defaultVariants: {
        size: 'small',
      },
    }
  ),
  section: cva(),
  header: cva(),
};
