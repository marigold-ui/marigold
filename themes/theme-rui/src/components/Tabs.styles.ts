import { ThemeComponent, cva } from '@marigold/system';

export const Tabs: ThemeComponent<'Tabs'> = {
  container: cva('flex flex-col gap-2'),
  tabsList: cva([
    'text-muted-foreground',
    'flex items-center p-0.5 h-auto gap-2 border-b border-border px-0 py-1',
  ]),
  tab: cva([
    'relative inline-flex items-center justify-center gap-1 rounded-sm px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors',
    '[&_svg]:shrink-0',
    'focus-visible:state-focus outline-none',
    'hover:bg-hover hover:text-foreground',
    'disabled:pointer-events-none disabled:opacity-50',
    'selected:text-foreground selected:hover:bg-hover',
    'data-[selected=true]:after:bg-foreground after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5',
  ]),
  tabpanel: cva(['py-4 rounded-sm', 'focus-visible:state-focus outline-none']),
};
