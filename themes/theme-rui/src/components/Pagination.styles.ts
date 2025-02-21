import { ThemeComponent, cva } from '@marigold/system';

export const Pagination: ThemeComponent<'Pagination'> = {
  navigationButton: cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors outline-offset-2 focus-visible:outline-2 outline-ring/30 dark:outline-ring/40 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 py-2 gap-1 px-2.5 sm:ps-4 aria-disabled:pointer-events-none aria-disabled:opacity-50'
  ),
  pageButton: cva([
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors outline-offset-2 focus-visible:outline-2 outline-ring/30 dark:outline-ring/40 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 bg-background size-9',
    'data-[selected=true]:border data-[selected=true]:border-input data-[selected=true]:shadow-xs',
    'hover:bg-accent hover:text-accent-foreground',
  ]),
  icon: cva('h-4 w-4'),
};
