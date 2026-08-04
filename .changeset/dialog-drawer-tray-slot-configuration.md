---
'@marigold/components': minor
'@marigold/theme-rui': minor
'@marigold/system': minor
---

feat(DST-1369): adopt the slot-configuration pattern in `Dialog`, `Drawer`, and `Tray`

The three overlay components now follow the same slot-configuration pattern as `Panel` and `Card`. Each publishes the slot contexts at its root, so the title, description, and action primitives pick up the overlay's theme classes wherever they are dropped:

- `Dialog.Title` / `Drawer.Title` / `Tray.Title` are thin wrappers over `<Title slot="title">`.
- New `Dialog.Description` / `Drawer.Description` / `Tray.Description` wrap `<Description slot="description">`.
- New `Dialog.Header` / `Drawer.Header` / `Tray.Header` are **optional** layout wrappers that group a title and description. A bare `<Title slot="title">` (or `<*.Title>`) without a header is a first-class, accessible authoring form — `aria-labelledby` resolves to it automatically.

The compound-component API is unchanged. The `<header>` element that previously wrapped the title is gone; the title now carries the header chrome directly, with no change to the rendered visuals.
