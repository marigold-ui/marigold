import { type ThemeComponent, cva } from '@marigold/system';

export const ActionBar: ThemeComponent<'ActionBar'> = {
  container: cva({
    base: [
      'relative w-fit',
      'flex items-center justify-between justify-items-center gap-16',
      'px-6 py-3',
      'shadow-elevation-overlay',
      'ui-contrast',
      'rounded-full font-medium',
      'focus-visible:ui-state-focus outline-none disabled:ui-state-disabled',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0',
      'entering:animate-slide-in',
      'exiting:animate-slide-out',
    ],
  }),
  selection: cva({ base: 'flex items-center gap-1' }),
  count: cva({
    base: 'flex items-center text-sm font-medium whitespace-nowrap',
  }),
  toolbar: cva({
    base: [
      'flex items-center',
      'flex-1 justify-center',
      'overflow-x-auto',
      'p-1 -m-1',
    ],
  }),
  clearButton: cva({
    base: [
      'inline-flex items-center justify-center',
      'shrink-0 size-8 rounded-full cursor-pointer transition-[color]',
      'hover:ui-state-hover-ghost',
      // Borderless, so `ui-state-focus` had nothing to recolor and degraded to
      // its halo alone — 1.71:1 against the bar, 1.12:1 once the hover wash sat
      // under it. No ring color fixes that: at the /50 the halo uses, even
      // charcoal-200 tops out at 2.84:1 over a dark ground. `ui-state-focus-item`
      // is full-opacity and inset, which reads 8.92:1 here.
      'focus-visible:ui-state-focus-item outline-none',
      // Borderless round button on a dark bar: the filled disabled treatment
      // would paint an opaque near-white circle and pin its ink to that fill.
      // Unprefixed, because the `disabled:ui-state-disabled` this has to redirect
      // arrives from IconButton's `ui-button-base`, not from here.
      'ui-state-disabled-ghost',
      '[&_svg]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0',
    ],
  }),
};
