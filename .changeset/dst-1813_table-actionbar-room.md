---
'@marigold/components': patch
'@marigold/system': patch
'@marigold/theme-rui': patch
'@marigold/cli': patch
'@marigold/docs': patch
---

fix(DST-1813): stop the Table's ActionBar from leaving an empty strip below it

While rows were selected, the Table made room for its ActionBar twice: the bar's own slot below the last row and, on top of that, a bottom padding of the same height. The panel around the table grew by about 128px, and half of that was empty space below the bar. The padding is gone. The Table now keeps room for the bar and an 8px gap only, and that room slides open and closed, so the content after the table moves smoothly instead of jumping.

The bar still never covers the rows or whatever follows the table, such as a pagination, and it still pins to the bottom of the screen or of a `Scrollable` while the table scrolls past. Keyboard focus now also keeps the focused row clear of the pinned bar on a scrolling page, where the previous `scroll-padding-bottom` on the table had no effect.

The ActionBar and ListView docs describe the new behaviour, and the ListView bulk actions example drops its own bottom padding.

The slide is themeable through the new `actionBarSpacer` slot on `Table`. `theme-rui` sets a 200ms height transition, and themes without the slot fall back to the room snapping into place.
