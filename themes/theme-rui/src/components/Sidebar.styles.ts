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
      // The mobile drawer floats over the page, so it wears the overlay
      // elevation — on desktop the sidebar is structure and stays flat.
      'shadow-elevation-overlay',
      'entering:animate-slide-in-left',
      'exiting:animate-slide-out-left exiting:[--slide-out-duration:0.1s]',
      'motion-reduce:entering:animate-none motion-reduce:exiting:animate-none',
    ],
  }),
  root: cva({
    base: [
      'overflow-hidden',
      // The shell keeps exactly one structural line: this divider. It bounds
      // the nav column so right-aligned trailing marks (the branch chevrons)
      // have an edge to anchor against — without it they float. Full hairline
      // strength (not a dialed-down alpha) so the line stays perceivable.
      // Everything else (header, footer, top navigation) separates on
      // whitespace.
      'bg-background border-r border-surface-border ui-scrollbar',
      'sm:data-[state=expanded]:w-64',
      'sm:data-[state=collapsed]:w-0',
      'sm:transition-[width] sm:duration-200 sm:ease-in-out',
      'motion-reduce:sm:transition-none',
    ],
  }),
  closeButton: cva({ base: ['absolute top-3.5 right-3', 'size-7'] }),
  content: cva({ base: 'sm:w-64' }),
  // Two things on every grid row:
  // 1. `border-…-0`: the seamless shell separates its regions with whitespace,
  //    so the `border-b`/`border-t` that `ui-panel-*` carries for Panel is
  //    switched off here.
  // 2. `min-w-0`: keep the sidebar's inner grid column from auto-sizing to its
  //    widest item (e.g. a long footer link) and overflowing the fixed `w-64`
  //    aside — otherwise rows (and the inset pill) get pushed past the edge,
  //    where the aside's `overflow-hidden` clips them.
  header: cva({
    base: 'ui-panel-header h-14 min-w-0 border-b-0',
  }),
  nav: cva({
    base: [
      // No horizontal gutter — rows full-bleed so the active tick reaches the
      // sidebar edge. min-w-0 lets the row column collapse to the aside width.
      'flex flex-col min-w-0 py-1 overflow-y-auto outline-none',
      'ui-scrollbar',
    ],
  }),
  // Footer links are ambient, not actions: a step quieter than the nav rows
  // so escape hatches never compete with navigation. (The Button label ships
  // `font-medium`; reset it like the back action does.)
  footer: cva({
    base: [
      'ui-panel-actions min-w-0 border-t-0',
      '[&_a]:text-secondary [&_a]:font-normal [&_a:hover]:text-foreground',
    ],
  }),
  toggle: cva({
    base: [
      'ui-button-base ui-press',
      'hover:ui-state-hover-ghost',
      'size-control-small [&_svg]:size-4.5',
    ],
  }),
  // An explicit, opt-in divider — the one line the seamless shell keeps, at
  // full surface-border strength so it stays perceivable.
  separator: cva({ base: 'bg-surface-border mx-3 my-1.5 h-px border-0' }),
  groupLabel: cva({
    // Quiet caption. Label text aligns with the pill's item text (16px = mx-2 +
    // px-2); a tight pb-1 tucks it close to the section it heads. Every label
    // gets the same pt-4 so the groups keep one even rhythm — the dense rows
    // make a 16px break read as a clear section boundary on its own.
    base: 'pl-4 pr-3 pt-4 pb-1 text-[0.6875rem] font-bold uppercase tracking-[0.07em] text-secondary',
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
    // sidebar edges) so the active fill reads as a distinct pill. A fixed
    // h-7.5 (30px) keeps the list dense — more rows per screen than a
    // padding-driven height would give.
    base: [
      'mx-2 flex items-center gap-2 px-2 h-7.5 rounded-surface text-sm',
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
      // Same pill geometry as the nav rows (mx-2 + px-2 + h-7.5) so the back
      // chevron sits on the shared 16px content column the nav text and section
      // labels align to, and the hover fill matches.
      'mx-2 flex items-center gap-2 px-2 h-7.5 text-sm rounded-surface',
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
