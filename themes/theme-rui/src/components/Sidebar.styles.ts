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
  overlay: cva({
    base: [
      // Partial (rail) drawer: dim the page so the exposed strip reads as a
      // tap-to-dismiss backdrop. The full-width sheet has nothing to dim.
      'data-partial:bg-overlay-backdrop',
      'data-partial:entering:animate-fade-in data-partial:exiting:animate-fade-out',
    ],
  }),
  modal: cva({
    base: [
      'flex h-full *:flex-1',
      'justify-start',
      // Mobile drawer floats over the page, so it takes overlay elevation; on
      // desktop the sidebar is structure and stays flat.
      'shadow-elevation-overlay',
      // Partial (rail) sheet: hug the content so the backdrop strip stays
      // exposed (`data-partial` sits on the overlay).
      'in-data-partial:w-[min(88vw,24rem)]',
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
  // Hoists the shared scroll-seam timeline (see `nav`) into scope so the footer
  // — a grid sibling, not a descendant — can drive its seam off it. --seam-color
  // tints that footer seam with the faint surface rim, not the opaque default.
  content: cva({
    base: 'sm:w-64 ui-scroll-seam-scope [--seam-color:var(--color-surface-border)]',
  }),
  // Always-on bottom edge (via `ui-panel-header`) so the brand row reads as a
  // header band, consistent with the rail's full-width top bar. h-topbar shares
  // the --spacing-topbar token with TopNavigation and the rail's sticky offset.
  // min-w-0: keep the grid column from overflowing the w-64 aside.
  header: cva({
    base: 'ui-panel-header h-topbar min-w-0',
  }),
  nav: cva({
    base: [
      // No horizontal gutter — rows full-bleed so the active tick reaches the
      // edge; min-w-0 lets the row column collapse to the aside width.
      'flex flex-col min-w-0 py-1 overflow-y-auto outline-none',
      // Declares the named timeline the footer seam animates against.
      'ui-scrollbar ui-scroll-seam-timeline',
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
      'flex flex-col gap-1 min-w-0 px-4 py-2 ui-scroll-seam-footer',
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
    ],
  }),
  // The one line the seamless shell keeps, by opt-in. Opaque `border` so it
  // stays perceivable (the surface rim is now faint).
  separator: cva({ base: 'bg-border mx-3 my-1.5 h-px border-0' }),
  groupLabel: cva({
    // Quiet caption aligned to the pill's item text (16px). pt-4 gives groups
    // an even rhythm that reads as a section break. A leading caption has
    // nothing above to separate from, so drop to `first:pt-[5px]` — the item
    // row's centering offset — so its text lines up with a first item's.
    base: 'pl-4 pr-3 pt-4 first:pt-[5px] pb-1 text-[0.6875rem] font-bold uppercase tracking-[0.07em] text-secondary',
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
      // Idle `secondary-bold` (charcoal-700): clickable rows must out-rank the
      // `secondary` groupLabel captions, which already sit at the AA floor for
      // 11px and can't go lighter. `foreground` would flatten idle against the
      // active row. Hover lifts to `foreground`.
      'text-secondary-bold hover:bg-hover hover:text-foreground',
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
  // A narrow rail of top-level destinations beside a section panel. Same quiet
  // skin as the single column. The sidebar's sole right edge is drawn by the
  // panel (expanded) or the rail column (collapsed), never both — so railRoot
  // has no border of its own.
  railRoot: cva({
    base: ['overflow-hidden bg-background'],
  }),
  // Column widths the component's `grid-cols` consumes. Two independent axes:
  // `--rail-w` collapses the rail to an icon strip; `--panel-w` goes to 0 when
  // no section panel shows. The mobile drawer reads only `--rail-w` (always
  // expanded), so the collapsed value never applies there.
  railLayout: cva({
    base: [
      '[--rail-w:var(--spacing-rail)] data-[state=collapsed]:[--rail-w:var(--spacing-rail-collapsed)]',
      '[--panel-w:var(--spacing-rail-panel)] data-[panel=collapsed]:[--panel-w:0rem]',
      // Same 200ms glide as the tiles' label fold (railItem).
      'transition-[grid-template-columns] duration-200 ease-in-out',
      'motion-reduce:transition-none',
    ],
  }),
  // Carries the always-on vertical divider (`border-r`) between rail and panel.
  // overflow-x-clip: fixed-width labels overhang the narrowing column mid-
  // animation (see railItem) — clip them instead of bleeding across the divider.
  railColumn: cva({
    base: ['flex flex-col min-h-0 overflow-x-clip', 'border-r border-border'],
  }),
  // The top-bar panel toggle. SidebarToggle already composes the icon Button
  // base (hitbox, ghost hover, press); this only adds the rail deltas: quieter
  // ink, 20px icon, and shrink-0 so shrinking breadcrumbs can't squeeze it.
  railToggle: cva({
    base: [
      'shrink-0',
      'text-secondary hover:text-foreground',
      '[&_svg]:size-5',
    ],
  }),
  // The scrolling item list (footer pinned below). overflow-x-hidden: the
  // fixed-width labels would otherwise grow a horizontal scrollbar.
  rail: cva({
    base: [
      'flex flex-col gap-0.5 flex-1 min-h-0 overflow-y-auto overflow-x-hidden py-1.5 ui-scrollbar',
    ],
  }),
  // Stacked tile: icon above a visible label. Content-hugging so the pill never
  // covers empty space and tile spacing is constant regardless of label lines.
  //
  // Collapsing folds the label row (grid-rows auto 1fr → 0fr) while py grows
  // 2 → 3, keeping each icon-only tile a 44px WCAG 2.5.5 hit target.
  //
  // The label fades rather than unmounts — opacity-0 (not sr-only) keeps it in
  // the a11y tree as the accessible name. hyphens-auto needs a document `lang`.
  railItem: cva({
    base: [
      // Cap the column at tile width so the fixed-width label can't drag the
      // icon off-center. Icon–label gap is a row-gap so it folds with the row
      // (a margin/padding would leak into the 0fr track).
      'grid grid-cols-[minmax(0,1fr)] justify-items-center mx-1 px-0.5 py-2',
      'grid-rows-[auto_1fr] gap-y-1',
      'in-data-[state=collapsed]:grid-rows-[auto_0fr] in-data-[state=collapsed]:gap-y-0',
      'in-data-[state=collapsed]:py-3',
      'transition-[grid-template-rows,row-gap,padding,color,background-color] duration-200 ease-in-out',
      'motion-reduce:transition-none',
      'text-secondary text-center cursor-pointer',
      'outline-none rounded-surface',
      'hover:text-foreground data-active:text-foreground',
      // Fill = current page, ink = ancestor. A section ancestor is ink-only
      // (its big tile would outweigh the leaf pill), except when the tile is
      // the sole marker: a direct-link page (`selected`) or the active section
      // on the collapsed rail (`hover`). Hover elsewhere is ink-lift only.
      'in-data-[state=collapsed]:data-active:bg-hover',
      'aria-[current=page]:bg-selected',
      'focus-visible:ui-state-focus',
      '[&_svg]:size-5 [&_svg]:shrink-0',
      // Label: caption size. Fixed width = expanded rail minus tile chrome
      // (--spacing-rail − 0.75rem), from the token not the animating --rail-w so
      // it can't re-wrap mid-collapse. min-h-0 + overflow-hidden let the 0fr
      // row clip it.
      '[&>span]:w-[calc(var(--spacing-rail)-0.75rem)] [&>span]:min-h-0 [&>span]:overflow-hidden',
      '[&>span]:text-[0.6875rem] [&>span]:font-medium [&>span]:leading-tight',
      '[&>span]:break-words [&>span]:hyphens-auto',
      // Fade out fast (no half-clipped text on the folding row), in late.
      '[&>span]:transition-opacity [&>span]:duration-150 [&>span]:delay-100 [&>span]:ease-out',
      'in-data-[state=collapsed]:[&>span]:opacity-0',
      'in-data-[state=collapsed]:[&>span]:duration-100',
      'in-data-[state=collapsed]:[&>span]:delay-0',
      'motion-reduce:[&>span]:transition-none',
    ],
  }),
  // Pinned below the scrolling list; same tiles, same rhythm.
  railFooter: cva({ base: ['shrink-0 flex flex-col gap-0.5 py-1.5'] }),
  // The section panel. Draws the sidebar's outer right edge; dropped when
  // collapsed so the rail column's border becomes the single edge (see
  // railRoot).
  panel: cva({
    base: [
      'flex flex-col min-h-0 overflow-hidden',
      // The nav fills the panel below the heading and clips its own overflow.
      '[&>nav]:flex-1 [&>nav]:min-h-0',
      'border-r border-border in-data-[panel=collapsed]:border-r-0',
    ],
  }),
  // Section heading atop the panel; also the focus target when the panel swaps.
  // Full-strength ink, deliberately distinct from the uppercase groupLabels.
  panelTitle: cva({
    base: [
      // Centered via line-height, not flex: ellipsis needs a block container.
      // `leading-10` after `text-sm` — tailwind-merge drops earlier `leading-*`
      // when a font-size sets its own line-height.
      'h-10 mt-1 px-4 outline-none truncate',
      'text-sm font-semibold text-foreground leading-10',
    ],
  }),
};
