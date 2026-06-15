---
'@marigold/components': minor
'@marigold/theme-rui': patch
'@marigold/system': minor
---

feat(DST-1370): migrate `ContextualHelp`, `SectionMessage`, and `EmptyState` to the slot-configuration pattern

- `SectionMessage.Title` now renders a semantic heading (`<h3>` by default) instead of a `<div>`, fixing an a11y gap. The level is configurable via the new `headingLevel` prop on `<SectionMessage>`. When a title is present, the container becomes a `role="group"` labelled by the title via `aria-labelledby`.
- New `<SectionMessage.Description>` sub-component for a short summary between title and content.
- `ContextualHelp.Title` now uses `slot="title"`, so the popover dialog gets a proper `aria-labelledby`. The title tag changes from `<h3>` to `<h2>` (same as `Dialog.Title`); visual appearance is unchanged.
- New `<ContextualHelp.Description>` sub-component.
- The `Theme` type now requires a `description` key on the `SectionMessage` and `ContextualHelp` style records; themes defining styles for these components must add it.
- `EmptyState`'s `title` now renders as a semantic heading (`<h3>` by default, configurable via the new `headingLevel` prop), and its `description` renders through the `<Description>` primitive (same DOM as before, now sitting 4px below the title to match the description rhythm of the other components). The flat-props API is unchanged.

- All three roots now also publish a `ButtonContext`, completing the slot-configuration set. It scopes action buttons (e.g. those placed in `SectionMessage.Content`, the `EmptyState` `action`, or `ContextualHelp` content) to a clean baseline so they never inherit a surrounding container's button cascade (such as a `Panel.Header`'s ghost/small look). No variant or positioning is imposed, so existing usage renders unchanged.
