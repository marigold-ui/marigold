---
'@marigold/theme-rui': minor
'@marigold/components': patch
---

feat(DST-1461): `Accordion` aligns like `Table` inside a bled `Panel`.

**What changed:**

- A bled `Panel.Content` / `Panel.CollapsibleContent` now publishes a `--bleed-px` custom property (set to the Panel's `--panel-px`). Non-bled content is unchanged and does not set it.
- The `default` Accordion `header` and `content` inset themselves by `--bleed-px` (via `--accordion-x-padding`, which falls back to `0px`). So inside a **bled** Panel the item dividers span edge-to-edge while the header/content align with the Panel title.
- In a bled Panel the full-width header (and its focus ring) is inset off the Panel border by one spacing step, matching `Panel.Collapsible`.

**Why:**

Dropping an `<Accordion>` into `<Panel.Content bleed>` now gives full-width item dividers _and_ header/content aligned with the Panel title — the same behavior `Table` already had, with no new Accordion prop or variant.

**Impact:**

- Standalone Accordions are unchanged (`--bleed-px` is only set by a bled Panel container, so the inset resolves to `0px`).
- Accordions inside a **non-bled** `Panel.Content` are also unchanged — the inset stays `0px`, so header/content keep aligning with the dividers as before (no double indent).
- Only Accordions inside a **bled** Panel gain the inset. The `card` variant is unaffected; it keeps its own `px-4`.
