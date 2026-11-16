import { ThemeComponent, cva } from '@marigold/system';

export const Tabs: ThemeComponent<'Tabs'> = {
  container: cva({ base: 'flex flex-col gap-2' }),
  // `py-1 -my-1` reserves room for the indicator (`-mb-1`) that `overflow-x`'s
  // implied `overflow-y` would clip. The tab's focus ring is inset and needs
  // none. `scroll-px-6` keeps the next tab peeking. `snap-x` is required
  // alongside `snap-proximity`: alone the latter sets only the strictness var
  // and never emits `scroll-snap-type`.
  tabsListScroll: cva({
    base: 'ui-scroll-mask-x ui-scrollbar-none -my-1 snap-x snap-proximity scroll-px-6 overscroll-x-contain py-1 motion-safe:scroll-smooth',
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
      'focus-visible:ui-state-focus-item outline-none',
      'hover:ui-state-hover-ghost',
      'disabled:cursor-not-allowed disabled:text-disabled',
      'selected:text-foreground selected:hover:ui-state-hover-ghost',
    ],
  }),
  tabIndicator: cva({
    base: [
      'absolute bottom-0 left-0 -mb-1 h-0.5 w-full bg-foreground',
      'origin-left',
      // RAC's SelectionIndicator animates `translate` by the rect delta and any
      // other listed property from its previous value. `width` needs an explicit
      // `w-full` (not `inset-x-0`) because `auto` does not transition.
      'transition-[translate,width] duration-250 ease-[cubic-bezier(0.165,0.84,0.44,1)]',
      'motion-reduce:transition-none',
    ],
  }),
  tabpanel: cva({
    base: [
      '-mx-1 px-1 py-4 rounded-sm',
      'focus-visible:ui-state-focus-item outline-none',
    ],
  }),
};
