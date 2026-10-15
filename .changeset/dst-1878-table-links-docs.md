---
'@marigold/docs': patch
---

docs(DST-1878): restore the Links section on the Table page

The Table page explains again when to put a link in a table and which `<Link>` variant to use. The section was lost during the docs migration. A table has many rows, so a link on each row's name repeats down the whole column: the section now recommends `variant="secondary"` for these and shows it with an events table. The standard `<Link>` is for supporting details that point away from the table, shown with venue websites that open in a new tab. The section also points to `textValue` for cells that hold a link, and notes that links opening a new window mark themselves. The Link page's variant table and the Sidebar detail page demo follow the same guidance.
