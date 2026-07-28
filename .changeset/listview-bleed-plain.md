---
'@marigold/theme-rui': minor
---

feat(DST-1489): `ListView` with `variant="plain"` aligns like `Table` and `Accordion` inside a bled container.

**What changed:**

- The `plain` list variant now sources its row padding from `--bleed-px` (via `--listview-item-px`), the custom property a bled `Panel.Content` / `Panel.CollapsibleContent` / `Drawer.Content` publishes. It falls back to the standalone row padding (`--spacing-stretch-regular-x`) when that property is unset.
- The `default` variant deliberately opts out and keeps the standalone padding.

**Why:**

`variant="plain"` already dropped the list's own frame so it could sit inside a container that provides one, but the rows kept their standalone padding. Inside a bled `Panel` that left the row text a few pixels off the Panel title — close enough to read as a mistake rather than a choice. Pairing `plain` with the container's `bleed` now gives full-width dividers and hover fill _and_ row text aligned with the container title, matching what `Table` and `Accordion` already do.

**Impact:**

- Lists on a page and lists inside a **non-bled** container are unchanged — `--bleed-px` is only set by a bled container, so the fallback applies.
- `variant="default"` is unchanged everywhere. It carries its own ring, shadow, and radius, so it shouldn't inherit its container's edge inset.
- Only a `plain` list inside a **bled** container changes: its rows adopt the container's horizontal padding.
