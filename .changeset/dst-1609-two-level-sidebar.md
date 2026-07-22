---
'@marigold/components': minor
'@marigold/theme-rui': minor
'@marigold/system': patch
---

feat(DST-1609): two-level sidebar navigation with `Sidebar.Rail` and `Sidebar.RailItem`

Adds a two-level navigation mode to the sidebar: a persistent rail of icon-first
top-level destinations next to a panel showing the active section's sub-navigation.
A `Sidebar.RailItem` wrapping a `Sidebar.Nav` is a section that shows a panel. One with
only an `href` is a direct link, and one inside `Sidebar.Footer` pins to the bottom of the
rail. Its `active` prop overrides href matching for pages the URL can't identify.
Collapsing (toggle or Cmd/Ctrl+B) hides the panel while the rail narrows to an icon
strip, so top-level navigation always stays available. On small screens the rail
renders as the same single-column drawer as the plain sidebar: sections drill in
(opened at the active section) and links close the drawer.

- `<AppShell>` switches to a full-width top bar automatically when a rail is present
  (pure CSS via `:has()`), so the brand never moves when the panel collapses.
- `Sidebar.Toggle` gains `variant="rail"` for its top-bar placement between the
  brand and the breadcrumbs.
- New theme tokens: `--spacing-topbar` (the shell's shared vertical datum for the top bar
  height, sidebar brand row, and rail sticky offset) and the rail column widths
  `--spacing-rail` / `--spacing-rail-collapsed` / `--spacing-rail-panel`.
- Idle single-column nav labels darken a step (new `--color-secondary-bold` token,
  charcoal-700) so they clearly out-rank the quiet group-label captions.
- Keyboard: the rail supports arrow-key (and Home/End) movement on top of its flat
  tab order, and the section panel's tab stop re-syncs to the current page when the
  route changes, so Tab re-enters at the active item.
- The `TopNavigation` bottom edge is now an always-on border. The non-reusable
  `ui-scroll-edge` and `ui-sidebar-seam-header` utilities are removed, so the sticky
  bar and the sidebar header carry a plain border instead.
- The `AppShell` header row is now sized `auto` (was a fixed `3.5rem`), so a shell
  without a `TopNavigation` no longer reserves an empty header band, so the row
  collapses to the height of its content.
- The shell's viewport-height claims (`AppShell` grid, sidebar and rail asides) read
  the new `--ui-viewport-height` custom property with a `100dvh` fallback. Set it on a
  wrapper to render the shell inside a bounded container (embedded previews, demos)
  instead of the browser viewport. Nothing changes when it is unset.
