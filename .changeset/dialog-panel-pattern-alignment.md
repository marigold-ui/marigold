---
'@marigold/theme-rui': minor
---

feat(DST-1238): align Dialog with the shared `ui-panel-*` pattern

Dialog now adopts the `ui-panel-content` and `ui-panel-actions` utilities already used by Drawer, Tray, and Sidebar. Visible changes are scoped to Dialog:

- Actions gain a `border-t` divider as the interaction-zone marker
- Content gains consistent `py-4` vertical padding (was `py-1`)
- Actions padding becomes symmetric `py-4` (was `pt-4 pb-6`)
- Responsive button stacking (`flex-col-reverse sm:flex-row`) remains Dialog-specific identity

Dialog's header keeps its original treatment (`px-6 pt-6`, no border). It's a conversational opener that sits close to the message body, not a section divider above scrollable content — the ticket's "maintain unique identity where functionally necessary" guidance applies.

New `ui-panel-content` utility (`overflow-y-auto outline-none px-6 py-4`) added; adopted by Dialog and Drawer. Tray retains its compact `p-2` content padding and Sidebar retains its tighter `px-3 py-1` nav padding because those areas have intentionally tighter densities.

The `ui-panel-*` utilities are now documented with an inline docstring in `ui.css` clarifying they're for modal-style panels (Dialog/Drawer/Tray/Sidebar) and distinct from the `Panel` component.

Drawer, Tray, and Sidebar have no visual change — Drawer migrates inline padding/scroll classes to the new `ui-panel-content` utility (identical CSS output); Tray and Sidebar style files are untouched.

[DST-1238](https://reservix.atlassian.net/browse/DST-1238)
