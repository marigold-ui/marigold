---
'@marigold/docs': patch
---

fix(DST-1676): derive the token overview's contrast matrix from the theme instead of a copied palette

The matrix hand-copied all 11 charcoal rungs and the palette hue into the demo and recomputed the published WCAG and APCA numbers from that literal. Nothing linked it to `tokens.css`, so a rebrand would have left the documented contrast numbers reporting the old palette, with no test to catch it. The numbers designers cite when judging a pairing are exactly the ones that must not be able to drift.

The demo now measures the palette instead. Hidden probes painted with `var(--color-charcoal-*)` are read back through a 1×1 canvas, which is what resolves the authored `oklch()` down to the sRGB the contrast math needs, and it keeps working if the palette ever moves to a different color space. The swatch grid paints from the same custom properties, so it is correct on the first frame without JavaScript, and only the score badges wait for the measurement. If the palette cannot be read the demo says so and leaves the badges blank rather than publishing zeroes, keeping the swatch grid that needs no measurement.

It also fixes the matrix's pinned first column, a defect that predates this change. The row-header cells painted no background, so the swatches scrolled visibly behind their labels, and the corner cell was pinned vertically but not horizontally, so it scrolled out of the port and clipped mid-word. Both now carry the surface fill, and their edges are inset shadows because collapsed borders belong to the table and stay behind when a cell is pinned. The header cells also gained `scope` and the table an accessible name, so a screen reader announces both rungs before a cell's numbers.

Note this fixes the matrix's inputs, not its algorithms. The APCA figures are still the simplified approximation the demo has always used and will not match a dedicated APCA tool.

The local `oklchToRgb` helper is gone with the literal it served. The WCAG and APCA helpers are unchanged. The prose no longer asserts the palette hue, and the `soft` token's documented value now mirrors the relative color syntax the theme actually declares rather than restating a resolved hue.
