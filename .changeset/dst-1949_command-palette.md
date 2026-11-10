---
'@marigold/components': minor
'@marigold/theme-rui': minor
'@marigold/system': minor
'@marigold/cli': patch
---

feat(DST-1949): add CommandPalette

`CommandPalette` is a searchable list of pages and actions that opens with ⌘K (Ctrl+K on Windows and Linux). It opens as a centred dialog on larger screens and as a tray on small ones. The first row is always active, so Enter runs the top match.

Compose it from `CommandPalette.Trigger`, `.Content`, `.Input`, `.List`, `.Group`, `.Item`, `.Empty` and `.Loading`. Results are filtered as the user types. Pass `filter={false}` with a controlled `inputValue` to load results yourself, and render `.Loading` while they load.

`Menu.Item` now derives its `textValue` from plain-text children. Typeahead in a `Menu` therefore works without setting `textValue` by hand.

The `Sidebar` shortcut now follows the same rules as the palette's. It listens for ⌘B on Apple devices and Ctrl+B elsewhere, no longer both, so Ctrl+B on a Mac moves the cursor in text fields again. It also leaves the key to a field that handles it first, for example a rich-text editor that binds it to bold.

The CLI knows the new component and its theme slots.
