---
'@marigold/components': minor
'@marigold/theme-rui': minor
'@marigold/system': minor
---

feat(DST-765): add `<SegmentedControl>` component

Adds a new `<SegmentedControl>` for compact, single-select view switching and quick filters. It is built on react-aria's `RadioGroup` / `RadioField` / `RadioButton` with a `SelectionIndicator`, so it is a real form field: `value` / `defaultValue` / `onChange`, the `name` attribute (submits like a radio group), `required`, `error` + `errorMessage`, `description`, `readOnly`, and validation all work exactly like the other Marigold form components (label/description/error route through `<FieldBase>`). The selected segment is marked by an animated indicator that slides between options. Items are declared via the compound `SegmentedControl.Item` (also exported as `SegmentedControlItem`), each with a `value`.

Two variants — `default` (a `bg-control` track with a raised `ui-surface` thumb, mirroring the `Switch`) and `ghost` (track-less, with a translucent ghost-Button-style indicator for dense toolbars) — plus `default`/`small` sizes (matching the `h-control` Input height) and a `fullWidth` option for equal-width segments. Hover, focus, press, and motion reuse the shared `ui-*` utilities (`ui-state-focus`, `ui-state-hover-ghost`, `ui-press`, `ease-out-quint`); the indicator respects `prefers-reduced-motion`.

`ToggleButtonGroup` now logs a dev-only warning when used with `selectionMode`, steering single-select use cases towards `SegmentedControl` (it remains for independent on/off actions in toolbars).

[DST-765](https://reservix.atlassian.net/browse/DST-765)
