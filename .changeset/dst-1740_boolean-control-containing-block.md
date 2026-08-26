---
'@marigold/components': patch
---

fix(DST-1740): give `Checkbox` and `Switch` labels a containing block for their hidden input

React Aria renders the real `<input>` inside the control's `<label>` wrapped in `VisuallyHidden`, which is `position: absolute` with no offsets. The label was `position: static`, so the input anchored to whatever positioned ancestor the consumer happened to have. In a list inside a dialog that is the dialog itself, a dozen static elements up.

An absolutely positioned box laid out against an ancestor outside a scroll container is not part of that container's scrolled content, so the input stopped travelling with the row it belongs to. Clicking a row far down the list focused an input the browser believed was over a thousand pixels away, and it scrolled the dialog to reveal it. In the reported case the dialog also set `overflow: hidden`, so there was no scrollbar to get back and it ended up blank.

Both labels are now `relative`. React Aria's own docs name this as a precondition of `VisuallyHidden` ("it must have a `position: relative` or `position: absolute` ancestor"), citing stray scrollbars — the focus jump is the sharper consequence, which is probably why it went unnoticed.

`Radio` already positioned its label and is unchanged. `Switch` looked like it did too, but its `relative` sat on a wrapper around the track, a sibling of the input rather than an ancestor, so it never reached it. That wrapper is gone and the track is now a direct child of the label, which carries the `relative`. `Checkbox.Group` renders `Checkbox` children and needs no change of its own.

Consumers who worked around this by setting `position: relative` on their own scroll containers can drop it, though leaving it in place is harmless.
