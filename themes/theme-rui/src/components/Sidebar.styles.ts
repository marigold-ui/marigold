import { type ThemeComponent, cva } from '@marigold/system';

/**
 * Two charcoal tiers of ink; the current page is an inset rounded pill with
 * whitespace to both sidebar edges:
 *
 * - Active — `foreground` text on a flat `selected` pill (a step darker than
 *   the sidebar).
 * - Idle   — a step lighter (`secondary`); hover previews the pill in `hover`.
 * - Labels — set apart by treatment (uppercase, smaller, heavier, tracked),
 *   not colour: charcoal-500 sits at 3.3:1, below the 4.5:1 AA floor.
 *
 * Extra top space on section labels separates groups without dividers.
 */
export const Sidebar: ThemeComponent<'Sidebar'> = {
  overlay: cva({}),
  modal: cva({
    base: [
      'flex h-full *:flex-1',
      'justify-start',
      // Mobile drawer floats over the page, so it takes overlay elevation; on
      // desktop the sidebar is structure and stays flat.
      'shadow-elevation-overlay',
      'entering:animate-slide-in-left',
      'exiting:animate-slide-out-left exiting:[--slide-out-duration:0.1s]',
      'motion-reduce:entering:animate-none motion-reduce:exiting:animate-none',
    ],
  }),
  root: cva({
    base: [
      'overflow-hidden',
      // The shell's one structural line. It bounds the nav column so the
      // right-aligned chevrons have an edge to anchor against. Uses the opaque
      // `border` (not the now-faint surface rim) to stay perceivable;
      // everything else separates on whitespace.
      'bg-background border-r border-border ui-scrollbar',
      'sm:data-[state=expanded]:w-64',
      'sm:data-[state=collapsed]:w-0',
      'sm:transition-[width] sm:duration-200 sm:ease-in-out',
      'motion-reduce:sm:transition-none',
    ],
  }),
  closeButton: cva({ base: ['absolute top-3.5 right-3', 'size-7'] }),
  // Hoists the nav's scroll timeline (see `nav`) into scope so the header and
  // footer — the header a *preceding* sibling — can drive their seams off it.
  content: cva({ base: 'sm:w-64 ui-sidebar-seam-scope' }),
  // border-b-0: regions separate on whitespace, not the border ui-panel-* adds
  // for Panel. min-w-0: stop the grid column growing to its widest item and
  // overflowing the fixed w-64 aside, where overflow-hidden clips rows and the
  // pill. Seam: hidden at rest, fades in as content scrolls under the header;
  // inactive on a short (non-scrolling) nav.
  header: cva({
    base: 'ui-panel-header h-14 min-w-0 border-b-0 ui-sidebar-seam-header',
  }),
  nav: cva({
    base: [
      // No horizontal gutter — rows full-bleed so the active tick reaches the
      // edge; min-w-0 lets the row column collapse to the aside width.
      'flex flex-col min-w-0 py-1 overflow-y-auto outline-none',
      // Declares the named timeline the header/footer seams animate against.
      'ui-scrollbar ui-sidebar-seam-timeline',
    ],
  }),
  // Ambient escape hatches, a step quieter than nav rows so they never compete
  // with navigation. Left-aligned on the nav's content column (not
  // ui-panel-actions' right-aligned padding): px-4 to the 16px column, link
  // children echo the nav pill (-mx-2 to the 8px inset, px-2, h-7.5, rounded,
  // secondary ink lifting to foreground on hover). Top seam mirrors the
  // header's, fading out as the list bottoms out.
  footer: cva({
    base: [
      'flex flex-col gap-1 min-w-0 px-4 py-2 ui-sidebar-seam-footer',
      '[&_a]:-mx-2 [&_a]:h-7.5 [&_a]:px-2 [&_a]:rounded-surface [&_a]:text-sm',
      '[&_a]:text-secondary [&_a]:font-normal',
      '[&_a:hover]:bg-hover [&_a:hover]:text-foreground',
    ],
  }),
  toggle: cva({
    base: [
      'ui-button-base ui-press',
      'enabled:hover:ui-state-hover-ghost',
      'size-control-small [&_svg]:size-4.5',
      // Inert, not gone: with a rail on a direct-link page there is no panel to
      // collapse, so the toggle quiets down instead of inviting a dead click.
      'disabled:text-disabled disabled:cursor-default',
    ],
  }),
  // The one line the seamless shell keeps, by opt-in. Opaque `border` so it
  // stays perceivable (the surface rim is now faint).
  separator: cva({ base: 'bg-border mx-3 my-1.5 h-px border-0' }),
  groupLabel: cva({
    // Quiet caption aligned to the pill's item text (16px). pt-4 on every label
    // gives groups an even rhythm; the dense rows make that gap read as a
    // section break on its own.
    base: 'pl-4 pr-3 pt-4 pb-1 text-[0.6875rem] font-bold uppercase tracking-[0.07em] text-secondary',
  }),
  navPanel: cva({
    base: [
      // No row gap — each row's own vertical padding does the spacing.
      'flex flex-col gap-0 py-1',
      'transition-[opacity,translate,filter] duration-300 ease-out sm:duration-200',

      // Behind (visited) — slides left
      'data-[position=before]:absolute data-[position=before]:inset-x-0 data-[position=before]:top-0',
      'data-[position=before]:invisible data-[position=before]:opacity-0',
      'data-[position=before]:-translate-x-1/3 data-[position=before]:sm:-translate-x-2',
      'data-[position=before]:sm:blur-[2px]',
      'data-[position=before]:pointer-events-none',

      // Ahead (not visited) — slides right
      'data-[position=after]:absolute data-[position=after]:inset-x-0 data-[position=after]:top-0',
      'data-[position=after]:invisible data-[position=after]:opacity-0',
      'data-[position=after]:translate-x-1/3 data-[position=after]:sm:translate-x-2',
      'data-[position=after]:sm:blur-[2px]',
      'data-[position=after]:pointer-events-none',

      'motion-reduce:transition-none',
    ],
  }),
  navLink: cva({
    // Inset rounded row (mx-2 → 8px to both edges) so the active fill reads as a
    // pill; fixed h-7.5 keeps the list dense.
    base: [
      'mx-2 flex items-center gap-2 px-2 h-7.5 rounded-surface text-sm',
      'transition-[color,background-color,box-shadow]',
      'motion-reduce:transition-none',
      'outline-none focus-visible:ui-state-focus',
      // Idle: `secondary`; hover previews the pill in `hover` and lifts to
      // `foreground`.
      'text-secondary hover:bg-hover hover:text-foreground',
      // Active: flat `selected` pill + `foreground` text at medium weight.
      'data-active:bg-selected data-active:font-medium data-active:text-foreground',
    ],
  }),
  backButton: cva({
    base: [
      // Same pill geometry as nav rows (mx-2 + px-2 + h-7.5) so the chevron sits
      // on the shared 16px content column.
      'mx-2 flex items-center gap-2 px-2 h-7.5 text-sm rounded-surface',
      // Button label ships font-medium; reset so it matches a regular nav row.
      '[&_span]:font-normal',
      'transition-[color,background-color]',
      'motion-reduce:transition-none',
      'outline-none focus-visible:ui-state-focus',
      'cursor-pointer mb-1',
      'text-secondary hover:bg-hover hover:text-foreground',
    ],
  }),

  // ── Two-level rail (Sidebar.Rail) ──────────────────────────────────────────
  // A persistent narrow rail of top-level destinations beside a section panel.
  // Same quiet skin as the single column: charcoal ink, flat `selected` pill,
  // the one opaque `border` as the sole structural line (the aside's right edge,
  // dividing nav from content).
  railRoot: cva({
    base: ['overflow-hidden bg-background border-r border-border ui-scrollbar'],
  }),
  // Brand band across the top of the rail+panel columns; aligns to the app
  // header row. Holds only the wordmark (no compact mark exists), so it lives
  // where there is horizontal room instead of the narrow rail — and fades out
  // (instead of clipping mid-letter) when the panel collapses that room away.
  // pl-4.5: optically aligns the wordmark's left edge with the rail icons — a
  // size-5 icon centered in the 3.5rem column starts at 18px. The band owns
  // this gutter, so the header slot's own padding is neutralised.
  brand: cva({
    base: [
      'flex items-center gap-2 min-w-0 overflow-hidden pl-4.5 pr-4',
      '*:px-0',
      'transition-opacity duration-200 motion-reduce:transition-none',
      'in-data-[panel=collapsed]:opacity-0',
    ],
  }),
  // The rail's scrolling item list (brand pinned above, footer below). Thin
  // scrollbar, hidden until hover — reused from `ui-scrollbar`.
  rail: cva({
    base: [
      'flex flex-col gap-0.5 flex-1 min-h-0 overflow-y-auto py-1.5 ui-scrollbar',
    ],
  }),
  // Icon-only square tile, centered in the rail column; the label lives in a
  // tooltip to the right of the icon (`aria-label` carries the name).
  railItem: cva({
    base: [
      'flex items-center justify-center size-10 mx-auto rounded-surface',
      'text-secondary cursor-pointer',
      'transition-[color,background-color] motion-reduce:transition-none',
      'outline-none focus-visible:ui-state-focus',
      'hover:bg-hover hover:text-foreground',
      // Active section/link: same flat `selected` pill as a nav row.
      'data-active:bg-selected data-active:text-foreground',
      '[&_svg]:size-5',
    ],
  }),
  railFooter: cva({ base: ['shrink-0 flex justify-center py-2'] }),
  // The section panel beside the rail. Its left hairline is the rail/panel
  // divider — it starts below the brand band (the band spans both columns), so
  // the rail reads as its own strip without a second full-height line. Dropped
  // while collapsed so it can't double up with the aside's right border.
  panel: cva({
    base: [
      'flex flex-col min-h-0 overflow-hidden',
      'border-l border-border in-data-[panel=collapsed]:border-l-0',
    ],
  }),
  // Section heading atop the panel; also the focus target when the panel swaps.
  // Sentence-case and full-strength ink — a heading, deliberately a different
  // species from the tiny uppercase `groupLabel` captions below it.
  panelTitle: cva({
    base: [
      'flex items-center h-10 mt-1 px-4 outline-none truncate',
      'text-sm font-semibold text-foreground',
    ],
  }),
};
