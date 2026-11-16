---
'@marigold/components': major
'@marigold/system': major
'@marigold/theme-rui': major
'@marigold/cli': patch
'@marigold/docs': patch
---

refactor(DST-1865): build the mobile tray on React Aria's `Sheet`

The bottom sheet behind Select, ComboBox, Autocomplete, TagField, DatePicker, DateRangePicker, Menu, ActionMenu and the Calendar presets on small screens now runs on React Aria's `Sheet` through a new internal `Sheet` primitive, instead of its own `motion` drag handling. The components and their props are unchanged.

What changes for users of those components on small screens:

- A downward swipe anywhere on the tray closes it, not only on the drag handle. When the content can scroll, it scrolls first.
- The backdrop fades with the swipe.
- Focus returns to the trigger on close, also without reduced motion.
- Escape and a press outside are ignored while the tray slides in, so a double tap on the trigger opens it instead of closing it again.
- Opening the mobile ComboBox, Autocomplete or TagField no longer scrolls the page behind the tray.
- The tray moves above the on-screen keyboard instead of staying behind it, so the results and actions stay in view while typing.

The [Responsive](/foundations/responsive#overlays-on-small-screens) foundations page describes how the tray behaves.

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
4. Replace `group-[[role=dialog]]/tray:` with `group-data-tray/tray:` wherever your theme styles something inside a tray, as the ListBox and Calendar styles do. The tray's group moved off the dialog element, so the old selector silently matches nothing and the list or calendar in a tray gets its ring and padding back.

`marigold migrate v19` does steps 1 and 4 for you: it adds the `Sheet` theme component with these styles when your theme has a `Tray`, rewrites the tray selector, and warns that `Tray.overlay` and the surface styles have moved, since steps 2 and 3 depend on your customizations.

The tray sets `--sheet-chrome` on its dialog, the height its handle, title and actions take up. Theme styles that give tray content a fixed height can use `calc(var(--sheet-available) - var(--sheet-chrome))` instead of a hard-coded offset.
