---
'@marigold/theme-rui': patch
'@marigold/docs': patch
---

fix(DST-1733): give every keyboard focus indicator at least 3:1 contrast

Keyboard focus now comes from exactly two utilities, and both clear the 3:1 that WCAG 2.1 SC 1.4.11 asks of a focus indicator.

- **`ui-state-focus`** draws a 1px ring in `--color-ring` with a soft halo around it. Before, it only recolored an edge the component had to draw itself, and on anything without one only the halo was left, at 2.08:1. It now draws the edge too. Framed controls such as inputs, selects, tags and the primary and secondary buttons look the same as before, because they already drew this ring. Ghost buttons, close buttons, Checkbox, Radio, Switch, Slider thumbs, the ActionBar's clear button, Calendar navigation buttons, the ContextualHelp trigger, the Table's drag handle and edit buttons, and Sidebar rail items now get the same ring, as does every other component that builds on `ui-interactive`. Checkbox no longer recolors its own border on focus, the ring sits outside it instead.
- **`ui-state-focus-item`**, the full-opacity inset ring that Menu and Tabs already use, now marks focus on rows and list items: Accordion headers, the Panel's collapsible header, Calendar month and year options, and Sidebar links and the back button.

The Calendar month and year triggers are now drawn like a `Select`. The ContextualHelp trigger tints on hover like a ghost button instead of showing the focus halo.

The token overview's focus highlight section now names the same rule: `ui-state-focus` on buttons and controls, `ui-state-focus-item` on rows and list items.

Four slots gained room so the ring does not sit on their content, without moving it: a standalone Accordion header extends slightly past the content column with its title still aligned, and the ContextualHelp trigger, the Collapsible trigger and Stepper step links grow around the same icon or label.
