---
'@marigold/theme-rui': patch
---

fix(DSTSUP-303): align Menu item labels when only some items have an icon

Menu and ActionMenu items now share one set of columns. When any item has a leading icon, or is a `master` or `admin` item, every label in the menu starts at the same position, including items inside sections. Items whose text is a plain string, not wrapped in `TextValue`, also land in the label column now. A menu without any icons keeps its compact layout, and selection menus look the same as before.
