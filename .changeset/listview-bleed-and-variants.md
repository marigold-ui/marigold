---
'@marigold/theme-rui': minor
'@marigold/components': minor
---

feat(DST-1489): `ListView` is flat by default, framed on request, and aligns like `Table` and `Accordion` inside a bled container.

**What changed:**

- The variants flipped and were renamed to match `Accordion`: `default` is now the flat list (divider lines only) and the framed surface is opt-in as `variant="card"`. The old `variant="plain"` is gone — it is what `default` now does.
- Row padding is sourced from `--bleed-px` (via `--listview-item-px`) on the base rather than per variant. That is the custom property a bled `Panel.Content` / `Panel.CollapsibleContent` / `Drawer.Content` publishes; it falls back to the standalone row padding (`--spacing-stretch-regular-x`) when unset.
- The framed variant is `ui-surface rounded-surface`. It previously also carried `shadow-elevation-border`, a tier this same release removes — a list in page flow doesn't float, so it composes no elevation at all.

**Why:**

A framed list was what a consumer got without asking, and it collides with anything that draws its own surface — a `Card`, a `Panel`, a docs preview — as a ring inside a ring 8px apart. `Accordion` already answers this shape the other way round, with flat as `default` and `card` as the opt-in, and every framed `ListView` usage today is a story or a docs demo.

Binding the bleed to a variant had the same problem from the other side: `<Table>` and `<Accordion>` adopt `--bleed-px` unconditionally, so both align inside a bled `Panel` with no opt-in, while `<ListView>` needed two knobs to do the same thing.

**Impact:**

- `variant="plain"` no longer resolves. Drop the prop — the default is that list.
- A list that relied on the old framed default needs `variant="card"`.
- A list inside a bled container now adopts the container's horizontal padding without any opt-in. Standalone lists and lists in a non-bled container are unchanged, since `--bleed-px` is only set by a bled container.
