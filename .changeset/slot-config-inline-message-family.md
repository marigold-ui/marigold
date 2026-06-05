---
'@marigold/components': minor
'@marigold/theme-rui': patch
'@marigold/system': patch
---

feat(DST-1370): migrate `ContextualHelp`, `SectionMessage`, and `EmptyState` to the slot-configuration pattern

- `SectionMessage.Title` now renders a semantic heading (`<h3>` by default) instead of a `<div>`, fixing an a11y gap. The level is configurable via the new `headingLevel` prop on `<SectionMessage>`. The container is labelled by the title via `aria-labelledby`.
- New `<SectionMessage.Description>` sub-component for a short summary between title and content.
- `ContextualHelp.Title` now uses `slot="title"`, so the popover dialog gets a proper `aria-labelledby`. The title tag changes from `<h3>` to `<h2>` (same as `Dialog.Title`); visual appearance is unchanged.
- New `<ContextualHelp.Description>` sub-component.
- `EmptyState` internally renders its `description` through the `<Description>` primitive. Its public API and DOM are unchanged; the description now sits 4px below the title, matching the description rhythm of the other components.

Note: action/button slot configuration (`ButtonContext`) for these components follows in a separate change once the slot-aware `Button` has landed.
