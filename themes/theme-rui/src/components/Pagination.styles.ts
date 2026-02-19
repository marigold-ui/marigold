import { ThemeComponent, cva } from '@marigold/system';

const button = [
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors',
  'focus-visible:ui-state-focus outline-none',
  'disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled-foreground',
  '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  'hover:bg-hover hover:text-hover-foreground',
  'cursor-pointer',
];

export const Pagination: ThemeComponent<'Pagination'> = {
  container: cva({ base: 'flex items-center justify-center space-x-2' }),
  navigationButton: cva({
    base: [
      ...button,
      'disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled-foreground',
      'h-9 py-2 gap-1 px-2.5',
      /**
       * Removes the spacing from the button when when there are hidden
       * elements (e.g. the hidden elements for accessibility).
       */
      'has-[+_[hidden]]:mr-0',
    ],
  }),
  pageButton: cva({
    base: [
      ...button,
      'bg-background size-9',
      'data-[selected=true]:ui-surface data-[selected=true]:shadow-elevation-border',
    ],
  }),
  icon: cva({ base: 'h-4 w-4' }),
  ellipsis: cva({
    base: 'text-foreground flex h-8 w-8 items-center justify-center',
  }),
};
