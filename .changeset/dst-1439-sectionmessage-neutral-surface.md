---
'@marigold/theme-rui': minor
'@marigold/components': patch
---

feat(DST-1439): give `SectionMessage` a white surface with a soft inset variant glow

`SectionMessage` no longer fills its background with a per-variant tint (`bg-info`, `bg-success`, `bg-warning`, `bg-destructive`). It now uses a white surface with a defined neutral border, neutral title and body text, and a soft per-variant colored inset glow that hugs the inner edge. The variant is conveyed by that glow plus the colored icon.

This is a visible design change for every variant. Because the fill stays white, standard `<Button>` and `<Link>` actions placed inside the message read correctly instead of floating on a colored surface, and body text keeps full contrast. Variants stay distinguishable without relying on color alone through the inset glow, distinct icon shape and color, and title. The flat, bordered, in-flow treatment keeps an inline message visually distinct from the floating, shadowed `<Toast>`. No API changes.
