---
'@marigold/components': patch
'@marigold/docs': patch
---

docs([DST-902]): Define asyncronous data loading patterns for components like `<Combobox>` and `<Autocomplete>`.

Both `<Combobox>` and `<Autocomplete>` now accept a new prop called `emptyState` that allows you to provide custom content to display when there are no items in the list, such as a message