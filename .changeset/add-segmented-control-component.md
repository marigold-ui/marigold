---
'@marigold/components': minor
'@marigold/theme-rui': minor
'@marigold/system': minor
---

feat(DST-765): add `<SegmentedControl>` component

Adds a new `<SegmentedControl>` for compact, single-select view switching and quick filters. It is built on react-aria's `RadioGroup` / `RadioField` / `RadioButton` with a `SelectionIndicator`, so it is a real form field: `value` / `defaultValue` / `onChange`, the `name` attribute (submits like a radio group), `required`, `error` + `errorMessage`, `description`, `readOnly`, and validation all work exactly like the other Marigold form components (label/description/error route through `<FieldBase>`). The selected segment is marked by an animated indicator that slides between options.

Options are declared via the compound API `SegmentedControl.Option` (also exported as `SegmentedControlOption`), each with a `value`:

```jsx
<SegmentedControl label="View" defaultValue="list">
  <SegmentedControl.Option value="list">List</SegmentedControl.Option>
  <SegmentedControl.Option value="grid">Grid</SegmentedControl.Option>
</SegmentedControl>
```

Two variants — `default` (a `bg-control` track with a raised `ui-surface` thumb, mirroring the `Switch`) and `ghost` (track-less, with a translucent ghost-Button-style indicator for dense toolbars) — at a single `default` size (matching the `h-control` Input height). Hover and focus reuse the shared `ui-*` utilities (`ui-state-focus`, `ui-state-hover-ghost`); the indicator slides between options (`ease-out-quint`) and respects `prefers-reduced-motion`.

To make segments divide the available width equally, use the standard `width` prop — e.g. `width="full"`. There is no separate `fullWidth` prop.

When the options exceed the available width the control scrolls horizontally instead of compressing the segments, keeping the selected option scrolled into view (reduced-motion aware). A scroll-driven edge fade signals there is more to scroll where supported, falling back to a native scrollbar otherwise.

`ToggleButtonGroup` now logs a dev-only warning when used with `selectionMode`, steering single-select use cases towards `SegmentedControl` (it remains for independent on/off actions in toolbars).

[DST-765](https://reservix.atlassian.net/browse/DST-765)
