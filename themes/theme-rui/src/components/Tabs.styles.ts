import { ThemeComponent, cva } from '@marigold/system';

export const Tabs: ThemeComponent<'Tabs'> = {
  container: cva({ base: 'flex flex-col gap-2' }),
  // `py-1 -my-1` reserves room for the focus rings and indicator that
  // `overflow-x`'s implied `overflow-y` would clip. `scroll-px-6` keeps the next
  // tab peeking. `snap-x` is required alongside `snap-proximity`: alone the latter
  // sets only the strictness var and never emits `scroll-snap-type`.
  tabsListScroll: cva({
    base: 'ui-scroll-mask-x -my-1 snap-x snap-proximity scroll-px-6 overscroll-x-contain py-1 motion-safe:scroll-smooth',
  }),
  // Depends on `tabsListScroll` above providing the `overflow-x`: the two slots
  // are a pair.
  tabsList: cva({
    base: [
      'text-secondary',
      'flex w-max min-w-full items-center p-0.5 h-auto gap-2 border-b border-border px-0 py-1',
    ],
  }),
  tab: cva({
    base: [
      'relative inline-flex items-center justify-center gap-1 rounded-sm px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-[color]',
      // shrink-0 so the row overflows (and scrolls) rather than compressing.
      'shrink-0 snap-start',
      '[&_svg]:shrink-0',
      'focus-visible:ui-state-focus outline-none',
      'hover:ui-state-hover-ghost',
      'disabled:cursor-not-allowed disabled:text-disabled',
      'selected:text-foreground selected:hover:ui-state-hover-ghost',
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
