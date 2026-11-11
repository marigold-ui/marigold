---
'@marigold/components': patch
'@marigold/system': patch
'@marigold/theme-rui': patch
'@marigold/cli': patch
---

refactor(DST-1865): build the mobile tray on React Aria's `Sheet`

The bottom sheet behind Select, ComboBox, Autocomplete, TagField, DatePicker, DateRangePicker, Menu, ActionMenu and the Calendar presets on small screens now runs on React Aria's `Sheet` through a new internal `Sheet` primitive, instead of its own `motion` drag handling. The components and their props are unchanged.

What changes for users of those components on small screens:

- A downward swipe anywhere on the tray closes it, not only on the drag handle. When the content can scroll, it scrolls first.
- The backdrop fades with the swipe.
- Focus returns to the trigger on close, also without reduced motion.
- Opening the mobile ComboBox or Autocomplete no longer scrolls the page behind the tray.

For theme authors: the `Tray` theme component loses its `overlay` slot. The backdrop and the tray surface now come from a new `Sheet` theme component with `backdrop`, `container` and `content` slots. Update `@marigold/theme-rui` together with `@marigold/components`, since an older theme without `Sheet` styles makes the tray throw on small screens.

The v18 migration codemod in `@marigold/cli` knows the new `Sheet` theme component and no longer expects a `Tray.overlay` slot.
