---
'@marigold/components': minor
'@marigold/theme-rui': minor
'@marigold/docs': patch
---

feat(DST-1489): add non-form interactive list component

Adds `<ListView>` and `<ListView.Item>`, a non-form list built on React Aria's `GridList`/`GridListItem` for rows the user operates in place — toggling a `<Switch>`, dismissing with an `<IconButton>`, opening a per-row `<ActionMenu>`, or following a link — without leaving the page. Unlike `<SelectList>`/`<Select>`/`<ListBox>`, `<ListView>` has no selection, no hidden input, and never becomes a submitted form value.

Row content is authored with Marigold's dedicated slot-aware components (`<TextValue>`, `<Description>`, `<Title>`), never a raw `<Text slot="…">`. `<ListView.Item>` forces any nested `<Title>` to render as a `<span>` instead of a real heading, so a list of rows never emits one document heading per row.

This closes the gap between `<List>` (presentational, no roles), `<ListBox>` (selection only — forbids focusable controls inside a row), `<SelectList>`/`<Select>` (form fields), `<Table>` (tabular), and `<Menu>` (commands that close on activation). The motivating consumer is the Popover notifications panel (DST-1485), and the docs cover two more must-support scenarios: a resource list with a per-row action menu, and a settings list of toggles.

v1 is intentionally minimal: no selection, no bulk-action bar, no async loading, and no drag-and-drop. These are tracked as follow-ups (selection ships together with a bulk-action bar, building on DST-1487).

**Documentation**

New `/components/collection/listview` docs page: anatomy, appearance, a "which list?" decision guide, the three must-support demos, accessibility notes (including the `<Title>`-as-span caveat), and cross-links to `<List>`, `<ListBox>`, `<SelectList>`, `<Table>`, and `<Menu>`.
