---
'@marigold/components': patch
---

fix(DST-1790): give table rows an accessible name again

A row is named by its `rowHeader` cell, and that name is what type to select
matches and what a screen reader announces alongside every other cell in the row.
React Aria reads it from the cell's content when that content is a plain string.
`Table.Cell` always handed React Aria a render function instead, so the check
could never pass, and every row in every table came out unnamed unless its author
wrote a `textValue` by hand.

`Table.Cell` now derives `textValue` from string and number content, so rows are
named again with no change at any call site. Typing a few characters moves focus
to the matching row, and selection is announced with something useful.

`Table.EditableCell` derives its name the same way, from the display content it
shows when it is not being edited, and it accepts a `textValue` of its own for the
first time.

Content that is not plain text still cannot be read, so such a cell states its own
`textValue`. That prop was always accepted and is now documented, and in
development a row header cell that needs one and does not have it logs a warning.
An explicit `textValue` on `Table.Cell` or `Table.Row` continues to win.

Worth knowing when you write one by hand: type to select matches from the start of
the value, so lead with what someone would actually type. `"Jane Doe"` is findable
by name, while `"4711 Jane Doe"` is findable only by its number.
