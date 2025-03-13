import { ThemeComponent, cva } from '@marigold/system';

export const Tabs: ThemeComponent<'Tabs'> = {
  container: cva('flex flex-col gap-2 items-center'),
  tabsList: cva([
    'bg-muted text-muted-foreground/70',
    'inline-flex w-fit items-center justify-center p-0.5 h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1',
  ]),
  tabpanel: cva('text-muted-foreground p-4 text-center text-xs'),
  tab: cva([
    'data-selected:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0',
    'hover:bg-hover hover:text-foreground data-selected:hover:bg-hover relative data-selected:bg-transparent data-selected:shadow-none',
    ' data-[selected=true]:after:bg-foreground after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5',
  ]),
};
