@AGENTS.md

# Anatomy diagrams

Moved here verbatim from `.claude/skills/component-docs-writer/references/anatomy-diagrams.md`,
retired in DST-1528. The 59 `*-anatomy.tsx` files under `docs/content/**` are built to this
contract and it was specified nowhere else.

## Canonical Frame (applies to every `*-anatomy.tsx`)

Every anatomy diagram in `docs/content/**` renders inside the same frame:

```tsx
<svg viewBox="<minX> <minY> 660 <height>" className="mx-auto h-auto w-full max-w-[90%]">
```

The viewBox **width must be 660** and the wrapper **must be `max-w-[90%]`**. Together they
fix the scale at 733.33 user units per content column, so `fontSize="14"` labels,
`strokeWidth="2"` strokes and `r="4"` connector dots come out the same size on every page.
`minX`/`minY`/`height` are free — only the width is part of the contract, since the SVG
scales to the column width and the height follows from the aspect ratio.

A diagram that needs more horizontal room than 660 units must be **drawn smaller**, not given
a wider viewBox: a wider viewBox silently shrinks that page's labels relative to every other
page. Likewise, a small diagram is drawn smaller inside the 660-wide frame rather than being
given a narrower `max-w-[…]`, which would blow its labels up.
