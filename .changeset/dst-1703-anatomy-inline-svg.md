---
'@marigold/docs': patch
---

docs(DST-1703): migrate the remaining anatomy diagrams to theme-aware inline SVG

Every component page with an `## Anatomy` section now renders a hand-authored inline SVG instead of an image. The 24 raster `.jpg` diagrams and the 3 static `.svg` assets that carried hardcoded hex fills (`FileField`, `TagField`, `TopNavigation`) are gone, along with three orphans left over from earlier migrations (`drawer`, `table`, `selectlist`). `docs/public/**/*-anatomy.*` no longer exists.

The old diagrams had one baked-in color scheme, so in dark mode they rendered as a bright block in the middle of a dark page and the labels lost contrast. The new ones consume Fumadocs theme tokens (`fill-fd-card`, `stroke-fd-border`, `fill-fd-foreground`, `fill-fd-primary`) and carry `transition-colors duration-300`, so they follow the theme toggle instead of fighting it. They are also sharp on HiDPI displays and reviewable as source rather than as a binary blob.

The diagrams depict the same parts under the same labels as before — this is a format migration, not a redesign. `LinkButton` imports `ButtonAnatomy` from the Button page rather than duplicating it, which is what the shared `button-anatomy.jpg` was already expressing.
