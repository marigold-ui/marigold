---
'@marigold/components': minor
'@marigold/theme-rui': patch
---

feat(DST-1634): standardize `Input` trailing-action alignment and make `size="icon"` a public `Button` API.

The `Input` leading icon is clamped to 16px so it no longer overlaps the placeholder. Every trailing action (clear button, chevron, loading spinner, or a custom icon button) now sits in a control-sized centered box flush to the edge, so its icon aligns at the same inset as the leading icon across `Input`, `SearchField`, `ComboBox`, `Autocomplete`, `TagField`, and `DatePicker`. `Button`'s `size="icon"` is now public and documented as the way to build an icon button, composing with any `variant` (for example `variant="ghost" size="icon"`).

Migration: `variant="icon"` was never a real Button variant. It silently rendered a default button, so any usage from older docs should switch to `size="icon"` (with a variant, for example `variant="ghost" size="icon"`).
