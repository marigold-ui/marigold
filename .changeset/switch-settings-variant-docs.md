---
'@marigold/docs': patch
---

docs(DST-1385): document Switch `variant="settings"` and the auto-save rule

Adds a Button-style variant table under `## Appearance` summarising `default` and `settings`, rewrites `Settings and preference` with placement guidance and the reasoning for why switches must live on auto-save surfaces (light-switch metaphor + `role="switch"` ARIA contract + save-semantics conflict), and adds a warning Callout reserving `variant="settings"` for auto-save surfaces.

