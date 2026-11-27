---
'@marigold/components': major
'@marigold/system': major
'@marigold/theme-rui': major
'@marigold/cli': patch
'@marigold/docs': patch
---

refactor(DST-1867): render the mobile Sidebar drawer through the internal `Sheet`

On small screens the `Sidebar` (single column and `Sidebar.Rail`) now opens as a full-width sheet from the start edge, built on the same internal `Sheet` as the tray. Props and the desktop sidebar are unchanged.

What changes for users on small screens:

- A swipe toward the start edge closes the drawer. Swiping up and down still scrolls the navigation, and drilling into a section slides inside the drawer without moving it.
- The slide in and out follows the swipe and mirrors in right-to-left languages, where the drawer comes from the right.
- Escape, the close button, tapping a link and <kbd>Cmd+B</kbd> / <kbd>Ctrl+B</kbd> close it as before, and focus returns to the toggle.

**Changed accessibility contract.** The open drawer is now a `dialog` named "Sidebar" ("Seitenleiste" in German). The `aside` inside it no longer carries that name, so it is no longer announced as a named complementary landmark. Tests that look the mobile drawer up by its landmark, for example `getByRole('complementary', { name: 'Sidebar' })`, need `getByRole('dialog', { name: 'Sidebar' })` instead. The desktop sidebar keeps its named `aside`.

Update `@marigold/theme-rui` together with `@marigold/components`.

### Custom theme migration

The `Sidebar` theme component loses its `overlay` and `modal` slots, and theme-rui no longer defines `animate-slide-in-left` / `animate-slide-out-left`.

1. Remove `overlay` and `modal` from your `Sidebar` theme component. The backdrop, surface, shadow and slide now come from `Sheet`. Keep styling the drawer's contents through `Sidebar.root`.
2. Remove any `animate-slide-in-left` / `animate-slide-out-left` classes and the `--animate-slide-in-left`, `--animate-slide-out-left` and `@keyframes slide-in-left` definitions from your theme, unless your own app uses them.
3. If your `Sheet.container` styles only bottom sheets, scope them to `data-[position=bottom]:` and give the drawer its own look with `data-[position=left]:` / `data-[position=right]:`. theme-rui squares the drawer's corners and keeps the lit top rim on bottom sheets only:

   ```ts
   container: cva({
     base: [
       'w-full border-0 ui-surface shadow-elevation-overlay outline-hidden',
       'data-[position=bottom]:rounded-b-none',
       'data-[position=bottom]:inset-shadow-black data-[position=bottom]:inset-shadow-sm/20',
       'data-[position=left]:rounded-none data-[position=right]:rounded-none',
     ],
   }),
   ```

`marigold migrate v19` adds a `Sheet` theme component with these styles when your theme has a `Tray` or a `Sidebar`, and warns that `Sidebar.overlay` and `Sidebar.modal` have moved. Steps 1 to 3 depend on your customizations, so make them by hand.
