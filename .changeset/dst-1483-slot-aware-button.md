---
'@marigold/components': minor
'@marigold/theme-rui': minor
'@marigold/system': minor
---

feat(DST-1483): remove ActionButton in favor of a slot-aware Button (rename ActionGroup → ButtonGroup)

The beta-only `<ActionButton>` is removed. `<Button>` is now slot-aware: it adapts
automatically inside a button container, so you write `<Button>` everywhere instead
of learning a second button component.

- `<ActionButton>` is removed. Use `<Button>`; it adapts inside `<ButtonGroup>` and
  `<Panel.Header>`. Opt a button out of the cascade with `slot={null}`.
- `<ActionGroup>` is renamed to `<ButtonGroup>`, mirroring the existing
  `ToggleButtonGroup → ToggleButtonContext → ToggleButton` trio.
- A single Marigold-owned `ButtonContext` drives the cascade (replaces
  `ActionButtonContext` + `ActionGroupContext`). RAC's own `ButtonContext`
  (`close`/`increment`/`decrement` slots) is untouched.
- **Uniform precedence:** a local prop (`variant`, `size`, `disabled`) always wins
  over the container. This drops the former `ActionGroup` `size`-group-wins outlier.
- `<ButtonGroup>` cascades `variant: 'secondary'` when unset, the same baseline
  as a standalone `<Button>`. Slot-aware parents override it where they want
  lower emphasis: `<Panel.Header>` cascades `variant: 'ghost'` + `size: 'small'`,
  so a labelled header action stays readable. An icon-only action (a bare-icon
  `<Button>`, an `<ActionMenu>` kebab) sets `size="icon"` to render as a square.
- `<ButtonGroup>` now owns a structural `flex gap-1` layout (orientation-aware), so
  a standalone cluster is spaced correctly — `<ActionGroup>` had no layout of its
  own. A container's positional className (e.g. Panel's `[grid-area:actions]`) still
  rides along and positions the group.
- Overlays (`Popover`, `Modal`, `Tray`, `Drawer`) reset `ButtonContext` at their
  content root, so a header/group cascade can't leak through the portal into an
  overlay's `slot="close"` or `Dialog.Actions` buttons.
- `<SelectList.Option>` cascades `variant: 'ghost'` to a nested `<Button>`,
  `<LinkButton>`, or `<ActionMenu>`, so a trailing in-row action reads as
  low-emphasis chrome without an explicit `variant`.

**Migration**

- `<ActionButton>` → `<Button>` (its `default` variant maps to `variant="ghost"`).
- `<ActionGroup>` → `<ButtonGroup>`.
- `ActionButtonContext` / `ActionGroupContext` → `ButtonContext`.
- `<ActionMenu>` keeps its public name. Its trigger is now a slot-aware `<Button>`
  that inherits the cascade instead of hardcoding a variant: it renders `secondary`
  on its own (the standalone `<Button>` baseline, matching the pre-unification look)
  and `ghost` inside `<Panel.Header>`, `<SelectList.Option>`, or a `<ButtonGroup>`.
  A `variant` set on the `<ActionMenu>` still wins.
