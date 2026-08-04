---
'@marigold/components': minor
'@marigold/theme-rui': patch
---

feat(DST-1635): add a `bleed` prop to `Drawer.Content` so edge-aware children can span the full Drawer width.

**What changed:**

- `<Drawer.Content bleed>` drops the Drawer's horizontal content padding and publishes a `--bleed-px` custom property, mirroring `Panel.Content`'s `bleed`.
- The horizontal padding shared by the sectioned overlay surfaces (`ui-panel-header` / `ui-panel-content` / `ui-panel-actions`) now comes from a single `--ui-panel-px` token, and a bled `Drawer.Content` re-publishes that exact token as `--bleed-px` so the two can't drift.
- Edge-aware children stay aligned with the Drawer title while their dividers/backgrounds reach the Drawer edges: `Accordion` reads `--bleed-px` directly, and `Table`'s edge-cell padding now falls back to `--bleed-px` (after the Panel-only `--panel-px`), so it aligns inside a bled Drawer too.

**Why:**

Placing an `<Accordion>` (or `Table`) inside `<Drawer.Content>` previously trapped it inside the content padding, so item dividers and hover/selection backgrounds could not reach the Drawer edges. `bleed` gives the same full-width alignment `Panel.Content bleed` already offered.

**Impact:**

- Default behavior is unchanged: without `bleed`, `Drawer.Content` keeps the padded `ui-panel-content` and `--bleed-px` stays unset (children resolve their inset to `0px`). The `--ui-panel-px` token resolves to the same `24px` the surfaces used before, so Dialog/Drawer/Tray are visually identical.
