---
'@marigold/components': patch
---

fix(DST-1629): apply a `SelectList` item's `action` slot styling to a trailing Marigold `Button`, `LinkButton`, or `ActionMenu` so the action spans both rows and stays centered. The action slot className was only provided on RAC's `ButtonContext`, which Marigold's `Button` ignores, so the action auto-placed into the title row and stretched it, pushing the description down. The className now flows through the Marigold `ButtonContext` that these components read.
