---
'@marigold/theme-rui': patch
---

Switch focus ring implementation from `box-shadow` (`ring-*`) to CSS `outline` to prevent clipping in scrollable containers and improve Windows High Contrast Mode accessibility. Replace `transition-all` and `transition-colors` with explicit `transition-[color,background-color]` to prevent outline-color from animating on focus. Redistribute padding from compound component containers to individual sub-components (Dialog, ContextualHelp, Accordion) so focus outlines have breathing room inside overflow boundaries.
