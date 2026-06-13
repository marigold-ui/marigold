---
'@marigold/components': patch
'@marigold/theme-rui': patch
'@marigold/system': patch
---

feat(DST-1366): introduce slot-configurable primitives

Adds three text-bearing role primitives — `Title`, `Description`, `TextValue` — and three action primitives — `ActionButton`, `ActionGroup`, `ActionMenu` — that participate in slot-keyed context. Text/heading slots use React Aria's `HeadingContext` / `TextContext` directly; action slots use Marigold-owned contexts (`ActionButtonContext`, `ActionGroupContext`, `ActionMenuContext`) consumed via `useContextProps`.

`Title` wraps RAC's `<Heading>` with `slot="title"` and `level={2}` as defaults, both overridable by `HeadingContext`. The `level` precedence is default ← context ← local, so a container can publish `{ level: 4 }` and drive a stretch of nested `<Title>`s to `<h4>` without each call site setting it. `Description` and `TextValue` forward straight to RAC's `<Text>` with `slot="description"` and `slot="label"` defaults respectively, letting `<Text>` consume `TextContext` on its own. None of the three carry typography props. Styling cascades from the surrounding container (or selection item) via `HeadingContext` / `TextContext`. Consumers drop these into containers without any `slot` wiring. The container provides level, layout (e.g. a grid area), size, variant, color, and any other styling through a single `Provider`.

`ActionGroup` is its own top-level component (own folder, own docs page, own Storybook entry) — there is no `ActionButton.Group` compound. It cascades `size`, `variant`, and `disabled` to nested `<ActionButton>`, `<LinkButton>`, and `<ActionMenu>` triggers via `ActionGroupContext`, with explicit per-prop precedence:

- `size`: group wins (visual uniformity within a cluster).
- `variant`: local wins (so a single destructive action can sit inside an otherwise uniform group).
- `disabled`: local wins; the group provides the default. Writing `disabled={false}` on a child re-enables it inside an otherwise-disabled group.

`ActionMenu` is rebuilt to compose its own `MenuTrigger` + `<ActionButton>` + `Popover` / `Tray` + RAC `Menu` rather than delegating to Marigold's `Menu`. The trigger uses `<ActionButton>` so an outer `ActionButtonContext` cascades to it. Marigold's `Menu` is untouched.

`LinkButton` is now slot-aware: it picks up `ActionButtonContext` and `ActionGroupContext` so a navigating action can sit alongside `<ActionButton>` inside an `<ActionGroup>` and inherit the same cascade. A `destructive-ghost` variant is added to match `<ActionButton>`. Context is consumed read-only (via `useSlottedContext`) to sidestep the anchor/button ref-type mismatch that `useContextProps` would have created. The read-only consumption now also absorbs `className` from `ActionButtonContext` (mirroring `<ActionButton>`'s `useContextProps`-driven className merge) so positional classes published by a parent container — e.g. a grid-area class injected via `ActionButtonContext` — reach the rendered anchor. This lets `<LinkButton>` participate in container-driven layouts the same way `<ActionButton>` does.

The container-driven layout pattern this enables comes with a corresponding convention: **positional `className` flows through slot contexts and is absorbed at the first layout boundary**. `<ActionGroup>` enforces the convention at its own boundary by scrubbing `ActionButtonContext` for its descendants — it republishes an empty value so nested `<ActionButton>`s and `<LinkButton>`s do not individually re-claim a positional class that was meant for the group as a whole. Cascading props (`size`, `variant`, `disabled`) still reach the children via `ActionGroupContext`, which they read independently. This convention scales to every future container that adopts the slot-configuration pattern.

`<ActionBar>`'s legacy top-level `ActionButton` slot is internalized and re-exposed as `ActionBar.Button`. Existing consumers that already use `<ActionBar.Button>` are unaffected.

Typography prep: `Headline` exports `HeadlineSize`, `Text` exports `TextSize` and `TextVariant`. The aliases aren't yet consumed by other primitives, but exposing them now lets a future typography-token PR replace runtime classes without rewriting consumer-facing prop types.
