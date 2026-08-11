---
'@marigold/theme-rui': minor
'@marigold/components': minor
---

feat(DST-1489): `ListView` is flat, and aligns like `Table` and `Accordion` inside a bled container.

**What changed:**

- The list ships one variant. `default` is the flat list (divider lines only) and there is no framed variant — the old `variant="plain"` is gone, since it is what `default` now does.
- Row padding is sourced from `--bleed-px` (via `--listview-item-px`) on the base rather than per variant. That is the custom property a bled `Panel.Content` / `Panel.CollapsibleContent` / `Drawer.Content` publishes; it falls back to the standalone row padding (`--spacing-stretch-regular-x`) when unset.

**Why:**

A framed list was what a consumer got without asking, and it collides with anything that draws its own surface — a `Card`, a `Panel`, a docs preview — as a ring inside a ring 8px apart. Every `ListView` in the repo lives inside such a container, so the frame had no consumer of its own; `Table` answers the same shape by drawing no frame at all and leaving the surface to its container. A standalone framed list is `<Card><ListView /></Card>`.

Binding the bleed to a variant had the same problem from the other side: `<Table>` and `<Accordion>` adopt `--bleed-px` unconditionally, so both align inside a bled `Panel` with no opt-in, while `<ListView>` needed two knobs to do the same thing.

**Impact:**

- `variant="plain"` no longer resolves. Drop the prop — the default is that list.
- A list inside a bled container now adopts the container's horizontal padding without any opt-in. Standalone lists and lists in a non-bled container are unchanged, since `--bleed-px` is only set by a bled container.
