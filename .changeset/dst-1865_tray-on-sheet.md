---
'@marigold/components': major
'@marigold/system': major
'@marigold/theme-rui': major
'@marigold/cli': patch
---

refactor(DST-1865): build the mobile tray on React Aria's `Sheet`

The bottom sheet behind Select, ComboBox, Autocomplete, TagField, DatePicker, DateRangePicker, Menu, ActionMenu and the Calendar presets on small screens now runs on React Aria's `Sheet` through a new internal `Sheet` primitive, instead of its own `motion` drag handling. The components and their props are unchanged.

What changes for users of those components on small screens:

- A downward swipe anywhere on the tray closes it, not only on the drag handle. When the content can scroll, it scrolls first.
- The backdrop fades with the swipe.
- Focus returns to the trigger on close, also without reduced motion.
- Opening the mobile ComboBox or Autocomplete no longer scrolls the page behind the tray.

Update `@marigold/theme-rui` together with `@marigold/components`. An older theme without `Sheet` styles makes the tray throw on small screens.

### Custom theme migration

This release adds a new required theme component, `Sheet`, and removes the `overlay` slot from the `Tray` theme component. **Custom themes must be updated, or every tray-based component throws on small screens.**

Without a `Sheet` entry, the page throws as soon as a Select, ComboBox, Autocomplete, TagField, DatePicker, DateRangePicker, Menu or ActionMenu renders on a small screen, even before it opens:

```
Error: Component "Sheet" is missing styles in the current theme.
```

1. Add a `Sheet` theme component. `backdrop` dims the page behind the tray, `container` is the tray surface and `content` is the dialog inside it:

   ```ts
   import { cva } from '@marigold/system';

   export const Sheet = {
     backdrop: cva({
       base: "data-[stack-index='0']:bg-overlay-backdrop",
     }),
     container: cva({
       base: [
         'w-full border-0 inset-shadow-black inset-shadow-sm/20',
         'rounded-b-none ui-surface shadow-elevation-overlay outline-hidden',
       ],
     }),
     content: cva({ base: 'outline-hidden' }),
   };
   ```

2. Remove `overlay` from your `Tray` theme component. Its backdrop styles belong in `Sheet.backdrop`. Positioning such as `fixed inset-0` is no longer needed.
3. Move the surface styles (background, border, shadow, rounding) from `Tray.container` to `Sheet.container`. `Tray.container` only lays out the grid inside the tray now, for example `grid grid-rows-[auto_auto_1fr_auto]`.

The v18 migration codemod in `@marigold/cli` knows the new `Sheet` theme component and no longer expects a `Tray.overlay` slot.
