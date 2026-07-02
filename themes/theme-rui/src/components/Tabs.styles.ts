import { ThemeComponent, cva } from '@marigold/system';

export const Tabs: ThemeComponent<'Tabs'> = {
  container: cva({ base: 'flex flex-col gap-2' }),
  // Scroll container for the tab row: scrolls horizontally with an edge-fade
  // affordance (`ui-scroll-mask-x`) when the tabs overflow, and is visually
  // inert when they fit. `py-1 -my-1` reserves vertical room for the tab focus
  // rings and the indicator that `overflow-x`'s implied `overflow-y` would
  // otherwise clip; `scroll-px-6` keeps the adjacent tab peeking when a tab is
  // scrolled into view. `snap-x snap-proximity` snaps on the x axis with a
  // proximity strictness that avoids fighting momentum and react-aria's
  // auto-scroll. The `snap-x` axis utility is required: on its own
  // `snap-proximity` only sets the strictness variable and never emits
  // `scroll-snap-type`, leaving `snap-start` and `scroll-px-6` inert.
  tabsListScroll: cva({
    base: 'ui-scroll-mask-x -my-1 snap-x snap-proximity scroll-px-6 overscroll-x-contain py-1 motion-safe:scroll-smooth',
  }),
  // `w-max` lets the row grow past its container so it overflows (and scrolls)
  // rather than wrapping; `min-w-full` keeps it filling the width when the tabs
  // fit. This depends on `tabsListScroll` above providing the `overflow-x` — the
  // two slots are a pair.
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
