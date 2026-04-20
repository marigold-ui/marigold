---
'@marigold/docs': patch
---

docs(DST-1326): restructure the Layouts foundation around `Panel` + primitives

Reworks the Layouts foundation page to frame the two responsibilities explicitly: `Panel` for page-level content sectioning, and the atomic layout primitives (`Stack`, `Inline`, `Inset`, `Split`, `Center`, `Tiles`, `Columns`) for everything inside. Adds a "Choosing the right layout" decision table, collapses the previous two-tier framing that implicitly treated `Panel` and `AppShell` as peers, and replaces the wireframe demo with an annotated SVG anatomy diagram that mirrors the `Panel` and `Sidebar` anatomies. Also trims the component-principles Layout section to defer to this page, switches the `concepts-spacing` demo to `Wireframe.Box` for nicer visuals, and fixes `Wireframe.Box` colours after the `secondary-*` token removal by falling back to the Tailwind neutral palette.
