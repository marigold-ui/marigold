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
  // Hoists the nav's scroll timeline (see `nav`) into scope so the footer — a
  // grid sibling, not a descendant — can drive its seam off it.
  content: cva({ base: 'sm:w-64 ui-sidebar-seam-scope' }),
  // Always-on bottom edge (the `border` hue, via `ui-panel-header`) so the
  // brand row reads as a distinct header band. min-w-0: stop the grid column
  // growing to its widest item and overflowing the fixed w-64 aside, where
  // overflow-hidden clips rows and the pill.
  header: cva({
    base: 'ui-panel-header h-14 min-w-0',
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
  // No right edge of its own: the sidebar's right border is drawn by the panel
  // (expanded) or the rail column (collapsed), so the two never double up.
  railRoot: cva({
    base: ['overflow-hidden bg-background ui-scrollbar'],
  }),
  // The rail column: the narrow strip of icons beside the panel. Carries the
  // always-on vertical divider (`border-r`) between the rail and everything to
  // its right; the top bar above has no vertical lines, so this divider starts
  // under the bar's bottom edge (a plain T-junction). When the panel is
  // collapsed this line is also the sidebar's right edge (the panel drops its
  // border), so it never doubles up.
  railColumn: cva({
    base: ['flex flex-col min-h-0', 'border-r border-border'],
  }),
  // The panel toggle as a compact top-bar icon button, sitting between the
  // wordmark and the breadcrumbs (no slot, no dividers — the bar separates its
  // zones by spacing alone). Ghost like the bar variant but with the rail
  // shell's icon ink: idle `secondary` lifting to `foreground`, a control-size
  // tile, and the rail's 20px icon weight. It can go inert on a direct-link
  // page (nothing to collapse). The icon's expand/collapse morph
  // (SidebarToggleIcon) is unaffected.
  railToggle: cva({
    base: [
      'ui-button-base ui-press',
      'size-control [&_svg]:size-5',
      'text-secondary',
      'enabled:hover:ui-state-hover-ghost enabled:hover:text-foreground',
      // Inert on a direct-link page (nothing to collapse): no hover lift.
      'disabled:text-disabled disabled:cursor-default',
    ],
  }),
  // The rail's scrolling item list (footer pinned below). Thin
  // scrollbar, hidden until hover — reused from `ui-scrollbar`.
  rail: cva({
    base: [
      'flex flex-col gap-0.5 flex-1 min-h-0 overflow-y-auto py-1.5 ui-scrollbar',
    ],
  }),
  // Stacked tile: icon above a visible label, centered in the rail column.
  // The 6.5rem rail (see the grid in SidebarRail) leaves the label 92px
  // (6.5rem − mx-1 − px-0.5), sized so "Veranstaltungen" (87px at 11px medium)
  // fits on one line; rarer, longer compounds (Automatisierungen) hyphenate
  // onto a second line instead of truncating — the label is the accessible
  // name, so it must stay readable.
  railItem: cva({
    base: [
      'flex flex-col items-center justify-center gap-1 mx-1 px-0.5 py-2 rounded-surface',
      'text-secondary text-center cursor-pointer',
      'transition-[color,background-color] motion-reduce:transition-none',
      'outline-none focus-visible:ui-state-focus',
      'hover:bg-hover hover:text-foreground',
      // Active section/link: same flat `selected` pill as a nav row.
      'data-active:bg-selected data-active:text-foreground',
      '[&_svg]:size-5 [&_svg]:shrink-0',
      // The label: same size as the panel's group captions, medium so it holds
      // its own under the icon. hyphens-auto needs a `lang` on the document.
      '[&>span]:max-w-full [&>span]:text-[0.6875rem] [&>span]:font-medium',
      '[&>span]:leading-tight [&>span]:break-words [&>span]:hyphens-auto',
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
      'border-r border-border in-data-[panel=collapsed]:border-r-0',
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
