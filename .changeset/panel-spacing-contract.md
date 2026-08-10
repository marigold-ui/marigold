---
'@marigold/theme-rui': minor
'@marigold/components': minor
---

feat(DST-1700): `--bleed-px` is the documented way to align content with a container's padding, and the overlay surface anatomy no longer borrows Panel's name.

**What changed:**

- The `ui-panel-header` / `ui-panel-content` / `ui-panel-actions` utilities and their `--ui-panel-px` token are now `ui-surface-header` / `ui-surface-content` / `ui-surface-actions` and `--ui-surface-px`. They style the shared anatomy of sectioned overlay surfaces (`Dialog`, `Drawer`, `Tray`, `Sidebar`) — never the `Panel` component, which has its own per-instance `--panel-px`. They are now named after `ui-surface`, the role those containers already wear.
- `Table` derives its edge cell padding from `--bleed-px` alone: `var(--bleed-px, var(--cell-x-padding))`. It previously read `var(--panel-px, var(--bleed-px, var(--cell-x-padding)))`.
- A bled `Card.Content` now publishes `--bleed-px` (set to the Card's `--card-px`), which it never did. Non-bled content is unchanged and does not set it.
- `--panel-px` / `--panel-py` / `--panel-gap`, their `--card-*` and `--page-*` counterparts, and `--bleed-px` are documented as read-only public API under [Reading a container's spacing](https://www.marigold-ui.io/foundations/spacing#reading-a-containers-spacing).

**Why:**

`--panel-px` is set on the `Panel` root, so it inherits into the whole subtree whether content is bled or not. Reading it first meant the chain always resolved at step one inside a Panel and the remaining branches were unreachable: a `Table` in a **non-bled** `Panel.Content` was inset by the Panel's padding on top of the content area's own padding, putting its edge cells 12px from the border while the Panel title sat at 12px — offset twice. Every bleedable container already publishes `--bleed-px`, and because that is scoped to the bled element rather than inherited from a root, it is only set where edge alignment actually applies.

**Impact:**

- A `Table` in a **bled** `Panel.Content`, `Panel.CollapsibleContent` or `Drawer.Content` is unchanged.
- A `Table` in a **non-bled** `Panel.Content` now uses the ordinary cell padding for its first and last cell instead of the Panel's horizontal padding. Docs steer tables to `bleed`, so most tables are unaffected.
- `Table` and `Accordion` inside a **bled** `Card.Content` now align with the Card title, where previously they got no edge alignment at all.
- `Dialog`, `Drawer`, `Tray` and `Sidebar` are visually unchanged. If you override `--ui-panel-px` or apply the `ui-panel-*` utilities directly, rename them; the token was undocumented, so nothing else in the public API moves.
