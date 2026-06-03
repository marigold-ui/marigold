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
- `<ButtonGroup>` cascades `variant: 'ghost'` when unset (the old ghost-cluster
  default); `<Panel.Header>` cascades `variant: 'ghost'` + `size: 'icon'`.
- Overlays (`Popover`, `Modal`, `Tray`, `Drawer`) reset `ButtonContext` at their
  content root, so a header/group cascade can't leak through the portal into an
  overlay's `slot="close"` or `Dialog.Actions` buttons.

**Migration**

- `<ActionButton>` → `<Button>` (its `default` variant maps to `variant="ghost"`).
- `<ActionGroup>` → `<ButtonGroup>`.
- `ActionButtonContext` / `ActionGroupContext` → `ButtonContext`.
- `<ActionMenu>` is unchanged (its public name stays; the trigger now uses `<Button>`
  and still defaults to a ghost icon button).
