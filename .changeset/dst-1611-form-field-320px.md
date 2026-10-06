---
'@marigold/components': patch
---

Fix form fields overflowing the 320px minimum supported width.

`Label` and `HelpText` now break text that has no break opportunity, such as a long compound word, a URL or a file name. Before, that text set its own minimum width and pushed the whole field past the screen. A wrapped error message also keeps its icon on the first line instead of centering it against the block.
