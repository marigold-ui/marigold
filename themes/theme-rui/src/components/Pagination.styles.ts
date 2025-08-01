import { ThemeComponent, cva } from '@marigold/system';

const button =
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors' +
  'focus-visible:util-focus-ring outline-none' +
  'disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled-foreground' +
  '[&_svg]:pointer-events-none [&_svg]:shrink-0' +
  'hover:bg-hover hover:text-hover-foreground' +
  'cursor-pointer';

export const Pagination: ThemeComponent<'Pagination'> = {
  container: cva('flex items-center justify-center space-x-2'),
  navigationButton: cva([
    button,
    'disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled-foreground',
    'h-9 py-2 gap-1 px-2.5',
  ]),
  pageButton: cva([
    button,
    'bg-background size-9',
    'data-[selected=true]:border data-[selected=true]:border-input data-[selected=true]:shadow-xs',
  ]),
  icon: cva('h-4 w-4'),
  ellipsis: cva('text-text-base flex h-8 w-8 items-center justify-center'),
};
