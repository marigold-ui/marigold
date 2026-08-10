---
'@marigold/theme-rui': minor
'@marigold/components': minor
---

feat(DST-1700): `--bleed-px` is the documented way to align content with a container's padding, and the overlay surface anatomy no longer borrows Panel's name.

**What changed:**

- The `ui-panel-header` / `ui-panel-content` / `ui-panel-actions` utilities and their `--ui-panel-px` token are now `ui-surface-header` / `ui-surface-content` / `ui-surface-actions` and `--ui-surface-px`. They style the shared anatomy of sectioned overlay surfaces (`Dialog`, `Drawer`, `Tray`, `Sidebar`) — never the `Panel` component, which has its own per-instance `--panel-px`. They are now named after `ui-surface`, the role those containers already wear.
- `Table` derives its edge cell padding from `--bleed-px` alone: `var(--bleed-px, var(--cell-x-padding))`. It previously read `var(--panel-px, var(--bleed-px, var(--cell-x-padding)))`.
- A bled `Card.Content` and `Card.Footer` now publish `--bleed-px` (set to the Card's `--card-px`), which they never did.
- Every non-bled content area (`Panel.Content`, `Panel.CollapsibleContent`, `Card.Content`, `Card.Footer`, `Drawer.Content`) clears `--bleed-px` with `initial`. Custom properties inherit through the whole subtree, so without the reset a container nested inside a bled one would read the outer container's padding and inset its edge-aware children twice.
- `--panel-px` / `--panel-py` / `--panel-gap`, their `--card-*` and `--page-*` counterparts, and `--bleed-px` are documented as read-only public API under [Reading container spacing](https://www.marigold-ui.io/foundations/spacing#reading-container-spacing).

**Why:**

`--panel-px` is set on the `Panel` root, so it inherits into the whole subtree whether content is bled or not. Reading it first meant the chain always resolved at step one inside a Panel and the remaining branches were unreachable: a `Table` in a **non-bled** `Panel.Content` was inset by the Panel's padding on top of the content area's own padding, putting its edge cells 12px from the border while the Panel title sat at 12px — offset twice. Every bleedable container already publishes `--bleed-px`, and because that is declared on the bled element rather than on a container root — and cleared again on every non-bled one — it is only in effect where edge alignment actually applies.

**Impact:**

- A `Table` in a **bled** `Panel.Content`, `Panel.CollapsibleContent` or `Drawer.Content` is unchanged.
- A `Table` in a **non-bled** `Panel.Content` now uses the ordinary cell padding for its first and last cell instead of the Panel's horizontal padding. Docs steer tables to `bleed`, so most tables are unaffected.
- `Table` and `Accordion` inside a **bled** `Card.Content` or `Card.Footer` now align with the container title, where previously they got no edge alignment at all.
- A `Table` or `Accordion` in a **non-bled** container nested inside a **bled** one (a `Card` inside a bled `Panel.Content`, say) no longer picks up the outer container's padding.
- `Dialog`, `Drawer`, `Tray` and `Sidebar` are visually unchanged. If you override `--ui-panel-px` or apply the `ui-panel-*` utilities directly, rename them; the token was undocumented, so nothing else in the public API moves. It also only ever existed in `18.0.0-rc.*`, never in a stable release, so only prerelease consumers are affected.
