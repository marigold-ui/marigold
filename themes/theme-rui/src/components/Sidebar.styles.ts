import { type ThemeComponent, cva } from '@marigold/system';

/**
 * The navigation reads in two charcoal tiers, and the current page is an
 * inset rounded pill (whitespace to both sidebar edges):
 *
 * - Active  — darkest text (`foreground`) on a flat `selected` pill
 *   (charcoal-300, a clear step darker than the sidebar).
 * - Idle    — a step lighter (`secondary`); hover previews the pill in the
 *   lighter `hover` charcoal.
 * - Labels  — `secondary` like idle, but set apart by treatment (uppercase,
 *   smaller, heavier, tracked) rather than a lighter colour: charcoal-500 on
 *   the sidebar landed at 3.3:1, below the WCAG AA 4.5:1 floor for small text.
 *
 * Section labels add extra top space so groups separate on whitespace alone —
 * no separators required.
 */
export const Sidebar: ThemeComponent<'Sidebar'> = {
  overlay: cva({}),
  modal: cva({
    base: [
      'flex h-full *:flex-1',
      'justify-start',
      'entering:animate-slide-in-left',
      'exiting:animate-slide-out-left exiting:[--slide-out-duration:0.1s]',
      'motion-reduce:entering:animate-none motion-reduce:exiting:animate-none',
    ],
  }),
  root: cva({
    base: [
      'overflow-hidden',
      // Shell/content divider: barely there. The translucent surface hairline
      // dialed down further (charcoal-950 ≈ 0.06 alpha), no elevation shadow —
      // the sidebar is structure, not a floating surface.
      'bg-background border-surface-border/60 ui-scrollbar',
      'sm:data-[state=expanded]:w-64',
      'sm:data-[state=collapsed]:w-0',
      'sm:transition-[width] sm:duration-200 sm:ease-in-out',
      'motion-reduce:sm:transition-none',
      'border-r',
    ],
  }),
  closeButton: cva({ base: ['absolute top-3.5 right-3', 'size-7'] }),
  content: cva({ base: 'sm:w-64' }),
  // Two things on every grid row:
  // 1. `border-surface-border/60`: all sidebar lines share one faint hairline
  //    (same as the shell divider), overriding the heavier `border-border`
  //    that `ui-panel-*` carries for Panel.
  // 2. `min-w-0`: keep the sidebar's inner grid column from auto-sizing to its
  //    widest item (e.g. a long footer link) and overflowing the fixed `w-64`
  //    aside — otherwise rows (and the inset pill) get pushed past the divider,
  //    where the aside's `overflow-hidden` clips them.
  header: cva({
    base: 'ui-panel-header h-14 min-w-0 border-surface-border/60!',
  }),
  nav: cva({
    base: [
      // No horizontal gutter — rows full-bleed so the active tick reaches the
      // sidebar edge. min-w-0 lets the row column collapse to the aside width.
      'flex flex-col min-w-0 py-1 overflow-y-auto outline-none',
      'ui-scrollbar',
    ],
  }),
  footer: cva({ base: 'ui-panel-actions min-w-0 border-surface-border/60!' }),
  toggle: cva({
    base: [
      'ui-button-base ui-press',
      'hover:ui-state-hover-ghost',
      'size-control [&_svg]:size-6',
    ],
  }),
  separator: cva({ base: 'bg-surface-border/60 mx-3 my-1.5 h-px border-0' }),
  groupLabel: cva({
    // Quiet caption. Label text aligns with the pill's item text (18px = mx-2 +
    // px-2.5); a tight pb-1.5 tucks it close to the section it heads.
    // A label that sits below a nav item gets a bigger top gap (pt-6 = 24px) so
    // the section break is obvious; a label at the very top of a panel keeps the
    // tighter pt-3 since there's nothing above to separate from.
    base: 'pl-4.5 pr-3 pt-3 pb-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-secondary [&:not(:first-child)]:pt-6',
  }),
  navPanel: cva({
    base: [
      // No gap between rows — each row's own vertical padding gives the
      // breathing room above and below instead.
      'flex flex-col gap-0 py-1',
      'transition-[opacity,translate,filter] duration-300 ease-out sm:duration-200',

      // Panel behind (already visited) — slides left
      'data-[position=before]:absolute data-[position=before]:inset-x-0 data-[position=before]:top-0',
      'data-[position=before]:invisible data-[position=before]:opacity-0',
      'data-[position=before]:-translate-x-1/3 data-[position=before]:sm:-translate-x-2',
      'data-[position=before]:sm:blur-[2px]',
      'data-[position=before]:pointer-events-none',

      // Panel ahead (not yet visited) — slides right
      'data-[position=after]:absolute data-[position=after]:inset-x-0 data-[position=after]:top-0',
      'data-[position=after]:invisible data-[position=after]:opacity-0',
      'data-[position=after]:translate-x-1/3 data-[position=after]:sm:translate-x-2',
      'data-[position=after]:sm:blur-[2px]',
      'data-[position=after]:pointer-events-none',

      'motion-reduce:transition-none',
    ],
  }),
  navLink: cva({
    // Each row is an inset, rounded rectangle (mx-2 → 8px whitespace to both
    // sidebar edges) so the active fill reads as a distinct pill.
    base: [
      'mx-2 flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm',
      'transition-[color,background-color,box-shadow]',
      'motion-reduce:transition-none',
      'outline-none focus-visible:ui-state-focus',
      // Tier 2 — idle (`secondary`); hover previews the active pill in the
      // lighter `hover` charcoal and lifts text to `foreground`.
      'text-secondary hover:bg-hover hover:text-foreground',
      // Tier 1 — active: a flat `selected` pill (charcoal-300, a clear step
      // darker than the charcoal-100 sidebar) + `foreground` text at medium
      // weight (between normal and bold).
      'data-active:bg-selected data-active:font-medium data-active:text-foreground',
    ],
  }),
  backButton: cva({
    base: [
      // Same pill geometry as the nav rows (mx-2 + px-2.5 + h-9) so the back
      // chevron sits on the shared 18px content column the nav text and section
      // labels align to, and the hover fill matches.
      'mx-2 flex items-center gap-2 px-2.5 h-9 text-sm rounded-lg',
      // The Button label ships `font-medium`; reset it so the back action reads
      // at the same weight as a regular nav item.
      '[&_span]:font-normal',
      'transition-[color,background-color]',
      'motion-reduce:transition-none',
      'outline-none focus-visible:ui-state-focus',
      'cursor-pointer mb-1',
      'text-secondary hover:bg-hover hover:text-foreground',
    ],
  }),
};
