---
'@marigold/components': minor
'@marigold/theme-rui': minor
'@marigold/system': minor
'@marigold/cli': patch
---

feat(DST-1949): add CommandPalette

`CommandPalette` is a searchable list of pages and actions that opens with ⌘K (Ctrl+K on Windows and Linux). It opens as a centred dialog on larger screens and as a tray on small ones. The first row is always active, so Enter runs the top match.

`CommandPalette.Trigger` holds the open state and the shortcut, like `Dialog.Trigger`, and opens the palette from `CommandPalette.Button` or any other button inside it. The palette takes `CommandPalette.Group` and `CommandPalette.Item` as children, and props for the placeholder, the empty state and loading. Results are filtered as the user types. Pass `filter={false}` to the palette to load all results yourself, or to a group whose rows come from a server search while the other groups keep the built-in match, and set `loading` while they load. `onSearchChange` hands the term to a server search once people pause typing. A group with a `prefix`, such as `e:` for events, narrows the search to that group when people type it, and the term arrives without the prefix. Enter pressed while server results are still on their way runs the first of the new rows. Screen readers hear when a search finds nothing and when loading takes longer than a second. With `more`, for example "More events…", the group ends with a row that narrows the search to it.

`Menu.Item` now derives its `textValue` from plain-text children. Typeahead in a `Menu` therefore works without setting `textValue` by hand.

The `Sidebar` shortcut now follows the same rules as the palette's. It listens for ⌘B on Apple devices and Ctrl+B elsewhere, no longer both, so Ctrl+B on a Mac moves the cursor in text fields again. It also leaves the key to a field that handles it first, for example a rich-text editor that binds it to bold.

The theme adds a `--text-2xs` token (10px), a step below `text-xs`, used by the palette's key caps.

The CLI knows the new component and its theme slots.
