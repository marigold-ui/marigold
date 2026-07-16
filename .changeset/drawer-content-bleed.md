---
'@marigold/components': minor
---

feat(DST-1635): add a `bleed` prop to `Drawer.Content` so edge-aware children can span the full Drawer width.

**What changed:**

- `<Drawer.Content bleed>` drops the Drawer's horizontal content padding and publishes a `--bleed-px` custom property (matching the Drawer's `px-6`), mirroring `Panel.Content`'s `bleed`.
- Edge-aware children that read `--bleed-px` (e.g. `Accordion` via `--accordion-x-padding`, `Table`) inset their own content to stay aligned with the Drawer title while their dividers/backgrounds reach the Drawer edges.

**Why:**

Placing an `<Accordion>` (or `Table`) inside `<Drawer.Content>` previously trapped it inside the 24px content padding, so item dividers and hover/selection backgrounds could not reach the Drawer edges. `bleed` gives the same full-width alignment `Panel.Content bleed` already offered.

**Impact:**

- Default behavior is unchanged: without `bleed`, `Drawer.Content` keeps the padded `ui-panel-content` and `--bleed-px` stays unset (children resolve their inset to `0px`).
