---
'@marigold/theme-rui': minor
---

feat(Sidebar): add `lifted` and `quiet` navigation hierarchy variants

The `Sidebar` styles are split into a shared structural base plus two visual
directions for the navigation, selectable via the existing `variant` prop on
`Sidebar.Provider`:

- **`lifted`** (default): the nav sits on the tinted `background` and the active
  row lifts to a white `surface` with the translucent `border-surface` hairline
  ring + `elevation-border` shadow — the same `ui-surface` recipe as Card/Panel.
  Hierarchy is carried by depth; hover darkens to `hover` so it stays visible
  against the tinted ground.
- **`quiet`**: almost no fills. Idle rows recede to a muted charcoal; the active
  row steps up to full `foreground` + semibold with a hairline leading tick.
  Hierarchy is carried by weight and value — lowest visual noise.

Shared refinements apply to both: tighter, quieter, uppercase section labels
(smaller, semibold, looser tracking) and roomier item padding/radius. The
default look therefore changes from the previous flat `selected` fill to the
`lifted` treatment.
