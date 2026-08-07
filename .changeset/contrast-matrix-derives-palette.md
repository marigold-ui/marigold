---
'@marigold/docs': patch
---

fix(DST-1676): derive the token overview's contrast matrix from the theme instead of a copied palette

The matrix hand-copied all 11 charcoal rungs and the palette hue into the demo and recomputed the published WCAG and APCA numbers from that literal. Nothing linked it to `tokens.css`, so a rebrand would have left the documented contrast numbers reporting the old palette, with no test to catch it. The numbers designers cite when judging a pairing are exactly the ones that must not be able to drift.

The demo now measures the palette instead. Hidden probes painted with `var(--color-charcoal-*)` are read back through a 1×1 canvas, which is what resolves the authored `oklch()` down to the sRGB the contrast math needs, and it keeps working if the palette ever moves to a different color space. The swatch grid paints from the same custom properties, so it is correct on the first frame without JavaScript, and only the score badges wait for the measurement. If the palette cannot be read the demo says so and leaves the badges blank rather than publishing zeroes, keeping the swatch grid that needs no measurement.

It also fixes the matrix's pinned first column, a defect that predates this change. No header cell painted a background, so the swatches scrolled visibly behind the row labels and, on a dark page background, the column labels sat at 3.4:1 on the page that documents contrast. The corner cell was not pinned sideways with the column it heads, so it scrolled out of the port and clipped mid-word. Every header cell now carries the surface fill, and the pinned column paints its edges as inset shadows because collapsed borders belong to the table and stay behind when a cell is pinned. The header row also carried a `top` offset that pinned nothing, since the scroll wrapper is constrained horizontally only, and that dead offset is gone rather than left to read as a feature. The header cells gained `scope` and the table an accessible name, so a screen reader announces both rungs before a cell's numbers. The unreadable-palette message arrives after hydration, so it is announced from a live region that was already mounted, and the table points its description at it, because blank badges announce as nothing.

Note this fixes the matrix's inputs, not its algorithms. The APCA figures are still the simplified approximation the demo has always used and will not match a dedicated APCA tool.

Measuring also costs the numbers their place in the server-rendered HTML, since they now arrive on the client. The markdown export is unaffected, because file-based demos were never inlined into it.

The local `oklchToRgb` helper is gone with the literal it served. The WCAG and APCA helpers are unchanged. The prose no longer asserts the palette hue, and the `soft` token's documented value now mirrors the relative color syntax the theme actually declares rather than restating a resolved hue.
