---
'@marigold/components': patch
---

fix(DST-1612): keep a Table inside its container when the columns no longer fit

A `Table` whose column minimums add up to more than the space available painted outside its container instead of staying in it. At 320px, the minimum supported viewport width, that was every table with more than a couple of columns, and the rows ran across the edge of the surrounding `Panel`.

**Current:** the columns never shrink below the sum of their minimum widths, and the table simply overflowed whatever box it was in. The content past the container's edge was only reachable by scrolling the page sideways, if the page scrolled at all.

**New:** when less width than that is available, the table scrolls sideways inside its own container, so nothing paints over the container's edge and every column stays reachable. A container that can give the columns their minimums is left alone.

While a table scrolls sideways, a sticky header or footer and the `actionBar` pin to that scroll area rather than to the page, because it is the nearest scrollport. A table wrapped in a `<Scrollable>` is left alone, since that scroll area already contains the table and has a height of its own to pin them to. Tables that fit keep following the page as before, and nothing changes in the component API.

A column that declares neither a width nor a `minWidth` now floors at 120px rather than React Aria's 75px. That floor is what the columns are laid out at once a table scrolls, and 75px was narrow enough to wrap a value as short as a formatted price. Columns that set their own `width` or `minWidth` are unaffected.
