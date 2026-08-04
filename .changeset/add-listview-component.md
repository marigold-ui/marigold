---
'@marigold/components': minor
'@marigold/theme-rui': minor
'@marigold/docs': patch
---

feat(DST-1489): add non-form interactive list component

Adds `<ListView>` and `<ListView.Item>`, a non-form list built on React Aria's `GridList`/`GridListItem` for rows the user operates in place — dismissing with a `<Button>`, opening a per-row `<ActionMenu>`, or following a link — without leaving the page. Unlike `<SelectList>`/`<Select>`/`<ListBox>`, `<ListView>` has no selection, no hidden input, and never becomes a submitted form value.

A row is a named-area grid — `'label actions' 'description actions'` — so every region names the cell it wants instead of counting columns and rows. Row content is authored with Marigold's slot-aware components (`<TextValue>`, `<Description>`, `<Title>`), and each of them claims its cell through slot context, so text still lands correctly when it's wrapped in a fragment, behind `memo()`, or inside a consumer's own component. A bare string child is wrapped as the row's text value; to emphasise part of a line, nest `<Text as="span">` inside `<TextValue>`/`<Description>`. A row carries one `<Description>` — it takes inline markup, so several facts go on one line.

Trailing controls claim their cell through Marigold's `ButtonContext` and inherit the row's `ghost` cascade, the same mechanism `<Panel.Header>` and `<SelectList.Option>` use. A row with more than one control **must** wrap them in a `<ButtonGroup>`: each control reads the same context and would otherwise be placed in the same cell. A dev-only warning catches that at authoring time. The trailing cell takes Button-family controls only; trailing badges, pills or timestamps have no slot yet.

`<ListView.Item>` forces any nested `<Title>` to render as a `<span>` instead of a real heading, so a list of rows never emits one document heading per row.

The list is flat by default (divider lines only) and takes `variant="card"` for a surface of its own, the same split `<Accordion>` uses — a framed list nested in a container that already draws a surface is a ring inside a ring.

This closes the gap between `<List>` (presentational, no roles), `<ListBox>` (selection only — forbids focusable controls inside a row), `<SelectList>`/`<Select>` (form fields), `<Table>` (tabular), and `<Menu>` (commands that close on activation). The motivating consumer is the Popover notifications panel (DST-1485), and the docs cover a second must-support scenario: a resource list with a per-row action menu.

v1 is intentionally minimal: no selection, no bulk-action bar, no async loading, no drag-and-drop, and no leading media. Leading icons and images need slot-aware icon/image components so placement doesn't depend on authoring order, which is tracked separately along with the rest of the follow-ups (selection ships together with a bulk-action bar, building on DST-1487).

**Documentation**

New `/components/collection/listview` docs page: anatomy, appearance, a "which list?" decision guide, the must-support demos, accessibility notes (including the `<Title>`-as-span caveat), and cross-links to `<List>`, `<ListBox>`, `<SelectList>`, `<Table>`, and `<Menu>`.
