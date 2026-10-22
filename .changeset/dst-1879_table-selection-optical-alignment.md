---
'@marigold/components': patch
---

fix(Table): center the selection checkbox and drag handle on the first line of text

With `alignY="top"`, the row's selection checkbox and drag handle sat 2px above the text in the neighbouring cells. The 16px control shared the cell's top edge with a 20px line of text, so their centers did not match. `bottom` was off by the same amount in the other direction, and `baseline` by 3px.

Both controls now sit in a box that is exactly one line of the cell's text tall, so every `alignY` value centers them on the neighbouring text's line, at every table size. Row heights are unchanged, except with `baseline`, where the misaligned control used to push the row 1px taller.
