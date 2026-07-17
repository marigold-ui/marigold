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
      // The rail's mobile drawer is a partial sheet: dim the page behind it
      // so the exposed strip reads as backdrop (tap to dismiss). The default
      // full-width sheet has nothing to dim.
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
      // Partial (rail-in-drawer) sheet: hug the content so the backdrop stays
      // exposed as a tap-to-dismiss strip. `data-partial` sits on the overlay.
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
  // Hoists the nav's scroll timeline (see `nav`) into scope so the footer — a
  // grid sibling, not a descendant — can drive its seam off it.
  content: cva({ base: 'sm:w-64 ui-sidebar-seam-scope' }),
  // Always-on bottom edge (the `border` hue, via `ui-panel-header`) so the
  // brand row reads as a distinct header band. min-w-0: stop the grid column
  // growing to its widest item and overflowing the fixed w-64 aside, where
  // overflow-hidden clips rows and the pill.
  header: cva({
    base: 'ui-panel-header h-topbar min-w-0',
  }),
  nav: cva({
    base: [
      // No horizontal gutter — rows full-bleed so the active tick reaches the
      // edge; min-w-0 lets the row column collapse to the aside width.
      'flex flex-col min-w-0 py-1 overflow-y-auto outline-none',
      // Declares the named timeline the footer seam animates against.
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
    ],
  }),
  // The one line the seamless shell keeps, by opt-in. Opaque `border` so it
  // stays perceivable (the surface rim is now faint).
  separator: cva({ base: 'bg-border mx-3 my-1.5 h-px border-0' }),
  groupLabel: cva({
    // Quiet caption aligned to the pill's item text (16px). pt-4 on every label
    // gives groups an even rhythm; the dense rows make that gap read as a
    // section break on its own. When a label leads the panel (first child, no
    // back button or item above it) that section-break gap has nothing to
    // separate from, so drop it to `pt-[5px]` — the item row's own centering
    // offset ((h-7.5 − text line-height) / 2) — so the first caption's text
    // starts exactly where a first item's text would.
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
      // Idle: `secondary-bold` (charcoal-700), a deliberate step above the
      // `secondary` (charcoal-600) `groupLabel` captions — the clickable rows
      // must clearly out-rank the passive section labels, which at charcoal-600
      // already sit at the WCAG-AA floor for their 11px size and cannot go
      // lighter. `foreground` here would flatten idle against the active row's
      // ink; `secondary-bold` is the intermediate the ramp otherwise lacks.
      // Hover previews the pill in `hover` and lifts to `foreground`.
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
  // A persistent narrow rail of top-level destinations beside a section panel.
  // Same quiet skin as the single column: charcoal ink, flat `selected` pill,
  // the one opaque `border` as the sole structural line (the aside's right edge,
  // dividing nav from content).
  // No right edge of its own: the sidebar's right border is drawn by the panel
  // (expanded) or the rail column (collapsed), so the two never double up.
  railRoot: cva({
    base: ['overflow-hidden bg-background'],
  }),
  // The rail shell's dimensions, on the grid that lays rail and panel side by
  // side (the component's `grid-cols` consumes the vars — same split as the
  // single column's `w-64` in `root`). Two independent axes: the rail column
  // is full width (icon + label) when expanded and an icon-only strip when
  // collapsed; the panel column only has width while a section panel shows.
  // In the mobile drawer only `--rail-w` is read (the panel takes `1fr`), and
  // the drawer always renders expanded, so the collapsed value never applies.
  railLayout: cva({
    base: [
      '[--rail-w:6.5rem] data-[state=collapsed]:[--rail-w:4rem]',
      '[--panel-w:15.5rem] data-[panel=collapsed]:[--panel-w:0rem]',
      // Same 200ms glide as the tiles' label fold (railItem).
      'transition-[grid-template-columns] duration-200 ease-in-out',
      'motion-reduce:transition-none',
    ],
  }),
  // The rail column: the narrow strip of icons beside the panel. Carries the
  // always-on vertical divider (`border-r`) between the rail and everything to
  // its right; the top bar above has no vertical lines, so this divider starts
  // under the bar's bottom edge (a plain T-junction). When the panel is
  // collapsed this line is also the sidebar's right edge (the panel drops its
  // border), so it never doubles up.
  // overflow-x-clip: labels keep a fixed width while the column width
  // animates (see railItem), so they briefly overhang the narrowing column —
  // clip instead of letting them bleed across the divider into the panel.
  railColumn: cva({
    base: ['flex flex-col min-h-0 overflow-x-clip', 'border-r border-border'],
  }),
  // The panel toggle in the top bar, between the wordmark and the
  // breadcrumbs. It IS an icon Button (Button.styles.ts ghost/icon —
  // SidebarToggle composes those classes underneath), so it inherits the
  // standard control-size square hitbox, ghost hover, and press feedback.
  // This recipe only layers the rail shell's deltas on top: `secondary` ink
  // lifting to `foreground`, the rail's 20px icon weight, and shrink-0 so
  // the top bar's flex Start zone can never squeeze the square below its
  // hitbox (it sits next to shrinking breadcrumbs).
  railToggle: cva({
    base: [
      'shrink-0',
      'text-secondary hover:text-foreground',
      '[&_svg]:size-5',
    ],
  }),
  // The rail's scrolling item list (footer pinned below). Thin
  // scrollbar, hidden until hover — reused from `ui-scrollbar`.
  // overflow-x-hidden: the fixed-width labels overhang the collapsed column;
  // without it the scroll container would grow a horizontal scrollbar.
  rail: cva({
    base: [
      'flex flex-col gap-0.5 flex-1 min-h-0 overflow-y-auto overflow-x-hidden py-1.5 ui-scrollbar',
    ],
  }),
  // Stacked tile: icon above a visible label, centered in the rail column.
  // Content-hugging geometry: the tile is exactly icon + label + even py-2,
  // so the pill never covers empty space (a one-line label makes a shorter
  // tile than a hyphenated two-line one) and the gap between tiles is
  // constant regardless of line count. The label keeps a fixed width
  // (5.75rem — the tile's content width at the expanded 6.5rem rail) so it
  // cannot re-wrap while the column width animates.
  //
  // Collapsing folds the label row (grid-rows auto 1fr → auto 0fr) with the
  // same 200ms ease-in-out as the column width, while py grows 2 → 3 so each
  // icon-only tile is a 2.75rem (44px) hit target — the WCAG 2.5.5 minimum —
  // and the icons glide — never jump — into place.
  //
  // The hover/selected pill and the focus ring sit on the tile itself, so
  // the visible affordance always matches the clickable area exactly — in
  // both states the whole content-hugging tile is the pill.
  //
  // The label fades instead of unmounting: out fast (100ms, no delay) so no
  // half-clipped text rides the folding row; in late (150ms after a 100ms
  // delay) so it only reappears once the tile has most of its size back.
  // opacity-0 (unlike sr-only) keeps it in the accessibility tree as the
  // accessible name. hyphens-auto needs a `lang` on the document.
  railItem: cva({
    base: [
      // grid-cols-[minmax(0,1fr)]: cap the implicit column at the tile width —
      // otherwise the fixed-width label sizes the column and drags the icon
      // off-center. The icon–label gap is a row-gap (not a margin/padding on
      // the label: both leak into the folded 0fr track) and folds to 0 in the
      // same transition.
      'grid grid-cols-[minmax(0,1fr)] justify-items-center mx-1 px-0.5 py-2',
      'grid-rows-[auto_1fr] gap-y-1',
      'in-data-[state=collapsed]:grid-rows-[auto_0fr] in-data-[state=collapsed]:gap-y-0',
      'in-data-[state=collapsed]:py-3',
      'transition-[grid-template-rows,row-gap,padding,color,background-color] duration-200 ease-in-out',
      'motion-reduce:transition-none',
      'text-secondary text-center cursor-pointer',
      'outline-none rounded-surface',
      'hover:text-foreground data-active:text-foreground',
      // A fill marks the current page, ink marks its ancestors: the tile is
      // ~3× the leaf pill's area, so giving the section ancestor the same
      // `selected` fill would outweigh the actual current page. While the
      // panel is open, the panel title + leaf pill already carry the location,
      // so the ancestor speaks through its `foreground` ink alone. The fill
      // returns exactly when the tile is the only visible marker: a
      // direct-link tile that IS the page (`selected`), or the active section
      // on the icon-only collapsed rail (`hover`, one step quieter). Hover is
      // ink-lift only, keeping fills exclusive to active states.
      'in-data-[state=collapsed]:data-active:bg-hover',
      'aria-[current=page]:bg-selected',
      'focus-visible:ui-state-focus',
      '[&_svg]:size-5 [&_svg]:shrink-0',
      // The label: same size as the panel's group captions, medium so it holds
      // its own under the icon. It is the foldable grid row: min-h-0 +
      // overflow-hidden let the 0fr row actually clip it.
      '[&>span]:w-[5.75rem] [&>span]:min-h-0 [&>span]:overflow-hidden',
      '[&>span]:text-[0.6875rem] [&>span]:font-medium [&>span]:leading-tight',
      '[&>span]:break-words [&>span]:hyphens-auto',
      // Fade choreography (see block comment above).
      '[&>span]:transition-opacity [&>span]:duration-150 [&>span]:delay-100 [&>span]:ease-out',
      'in-data-[state=collapsed]:[&>span]:opacity-0',
      'in-data-[state=collapsed]:[&>span]:duration-100',
      'in-data-[state=collapsed]:[&>span]:delay-0',
      'motion-reduce:[&>span]:transition-none',
    ],
  }),
  // Pinned below the scrolling rail list. Hosts rail items (stacked tiles,
  // same as the list — they carry their own mx/px), mirroring the list's
  // vertical rhythm.
  railFooter: cva({ base: ['shrink-0 flex flex-col gap-0.5 py-1.5'] }),
  // The section panel beside the rail. Its right hairline is the sidebar's
  // right edge (dividing nav from content) — the rail column owns the
  // rail/panel divider, so the panel only draws its outer edge. Dropped while
  // collapsed (the column shrinks to zero) so the rail column's border becomes
  // the single right edge, without doubling up.
  panel: cva({
    base: [
      'flex flex-col min-h-0 overflow-hidden',
      // The nav fills the panel below the heading and clips its own overflow.
      '[&>nav]:flex-1 [&>nav]:min-h-0',
      'border-r border-border in-data-[panel=collapsed]:border-r-0',
    ],
  }),
  // Section heading atop the panel; also the focus target when the panel swaps.
  // Sentence-case and full-strength ink — a heading, deliberately a different
  // species from the tiny uppercase `groupLabel` captions below it.
  panelTitle: cva({
    base: [
      // Centered via line-height, not flex: `text-overflow: ellipsis` only
      // works on block containers, so a flex heading would clip mid-glyph
      // without the ellipsis. `leading-10` after `text-sm` — tailwind-merge
      // treats a font-size as also setting line-height and drops earlier
      // `leading-*` classes.
      'h-10 mt-1 px-4 outline-none truncate',
      'text-sm font-semibold text-foreground leading-10',
    ],
  }),
};
