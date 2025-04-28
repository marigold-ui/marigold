import { ThemeComponent, cva } from '@marigold/system';

export const Pagination: ThemeComponent<'Pagination'> = {
  navigationButton: cva([
    'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors',
    'focus-visible:util-focus-ring',
    'disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled-foreground',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    'hover:bg-hover hover:text-hover-foreground',
    'h-9 py-2 gap-1 px-2.5',
    'cursor-pointer',
  ]),
  pageButton: cva([
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors bg-background size-9',
    'focus-visible:util-focus-ring',
    'disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled-foreground',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    'data-[selected=true]:border data-[selected=true]:border-input data-[selected=true]:shadow-xs',
    'hover:bg-hover hover:text-hover-foreground',
    'cursor-pointer',
  ]),
  icon: cva('h-4 w-4'),
};
