---
'@marigold/components': patch
---

fix(DST-1660): keep a loading `Button`'s accessible name

A `<Button loading>` previously had **no accessible name at all**. The label is kept mounted so the button doesn't change width when the spinner is overlaid, but it was hidden with `invisible` (`visibility: hidden`), which removes a subtree from the accessibility tree — not just from the screen. The spinner's own `aria-label` did not substitute, because that is a child widget's name rather than text content the button can take its name from.

The effect: a screen reader announced "Delete, button" before the press and roughly "dimmed, button" the moment the action started, so the user lost the identity of the operation they were waiting on. That is a WCAG 2.1 §4.1.2 (Name, Role, Value) failure at Level A, and it was worse than a plain `disabled` button, which keeps its name.

The label is now hidden with `opacity-0`. It reserves the exact same layout box, so nothing moves — verified by comparing `getBoundingClientRect()` for every button across all three surface grounds, with `display: none` as a control to confirm the measurement detects real shifts. Rendering is unchanged; this is purely a fix to what assistive technology reports.
