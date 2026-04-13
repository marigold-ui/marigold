import { ThemeComponent, cva } from '@marigold/system';

export const Tabs: ThemeComponent<'Tabs'> = {
  container: cva({ base: 'flex flex-col gap-2' }),
  tabsList: cva({
    base: [
      'text-muted-foreground',
      'flex items-center p-0.5 h-auto gap-2 border-b border-border px-0 py-1',
    ],
  }),
  tab: cva({
    base: [
      'relative inline-flex items-center justify-center gap-1 rounded-sm px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-[color,background-color]',
      '[&_svg]:shrink-0',
      'focus-visible:ui-state-focus outline-none',
      'hover:bg-current/10',
      'disabled:pointer-events-none disabled:text-disabled-foreground',
      'selected:text-foreground selected:hover:bg-current/10',
    ],
  }),
  tabIndicator: cva({
    base: [
      'absolute inset-x-0 bottom-0 -mb-1 h-0.5 bg-foreground',
      'origin-left',
    ],
  }),
  tabpanel: cva({
    base: ['py-4 rounded-sm', 'focus-visible:ui-state-focus outline-none'],
  }),
};
