---
'@marigold/docs': patch
---

docs: remove dash punctuation and semicolons from documentation prose

Rewrites em-dash and en-dash punctuation and prose semicolons across the
component, foundation, and pattern docs into plain sentences for easier
reading. Numeric ranges now read as "N to M". Example strings that show
literal component output (date and number range formatting, filter chip
labels) keep their en-dash because it represents real output.
