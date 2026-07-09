---
'@marigold/theme-rui': minor
---

feat(DST-1461): `Accordion` aligns like `Table` inside a bled `Panel`.

**What changed:**

- The `default` Accordion `header` and `content` now pick up horizontal padding from a new `--accordion-x-padding` custom property, which resolves to the Panel's `--panel-px` when nested inside a `Panel` and falls back to `0px` otherwise.

**Why:**

Dropping an `<Accordion>` into `<Panel.Content bleed>` now gives full-width item dividers _and_ header/content aligned with the Panel title — the same behavior `Table` already had, with no new Accordion prop or variant.

**Impact:**

- Standalone Accordions are unchanged (`--panel-px` is only set inside a Panel, so the padding resolves to `0px`).
- The `card` variant is unaffected; it keeps its own `px-4`.
