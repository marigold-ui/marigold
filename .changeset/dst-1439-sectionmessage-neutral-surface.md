---
'@marigold/theme-rui': minor
'@marigold/components': patch
---

feat(DST-1439): give `SectionMessage` a neutral surface with a muted variant border

`SectionMessage` no longer fills its background with a per-variant tint (`bg-info`, `bg-success`, `bg-warning`, `bg-destructive`). It now sits on a neutral `ui-surface` with neutral title and body text. The severity is carried by a muted per-variant colored border (the accent mixed halfway into the neutral border) plus the colored icon.

This is a visible design change for every variant. Because the surface stays neutral, standard `<Button>` and `<Link>` actions placed inside read correctly instead of floating on a colored fill. On the old tint the default `<Button>` (variant `secondary`, which has its own `ui-surface` fill) rendered as a foreign chip on the colored container for every variant except error. The muted border sits at the container edge, away from the content, so it signals the variant without touching the actions. The border color is set through `ui-surface`'s `--ui-border-color` hook, which is registered as a non-inheriting custom property, so it stays scoped to the container and does not leak into nested action borders.

Variants stay distinguishable without relying on color alone through the colored border, the distinct icon shape and color, and the title. The bordered, in-flow treatment keeps an inline message visually distinct from the floating, shadowed `<Toast>`. No API changes.
