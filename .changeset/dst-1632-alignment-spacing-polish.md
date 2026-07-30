---
'@marigold/components': patch
'@marigold/theme-rui': patch
---

fix(DST-1632): center the section `Loader` together with its label and give the `Table` drag handle edge spacing.

The section `Loader` sized its container to a fixed square, so a labelled loader overflowed the box and the section wrapper centered the box instead of the spinner-and-label group. The spinner now carries the fixed size and the container is content-sized, so the whole group centers as one. The `Table` drag cell had no padding, leaving the grip flush against the row edge. It now uses the shared cell edge padding and its column matches the checkbox column width, so the grip lines up with its header and the first cell.
