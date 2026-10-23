---
'@marigold/theme-rui': patch
---

style(DST-1903): give the link Button variant room around its focus ring

The `link` Button variant had no padding, so the focus ring `ui-state-focus` draws since DST-1733 sat directly on the label. It now has 4px of padding that a matching negative margin takes back, so the ring clears the text and the label stays where it was.
