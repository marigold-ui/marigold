---
'@marigold/components': patch
'@marigold/theme-rui': patch
'@marigold/system': patch
---

feat(DST-1366): introduce slot-configurable primitives

Phase 0 of the slot-configuration pattern. Adds four text-bearing primitives — `Title`, `Description`, `TextValue` — and three action primitives — `ActionButton`, `ActionButton.Group`, `ActionMenu` — that participate in slot-keyed context via React Aria's `useContextProps`.

`Title` is the canonical container heading (default `slot="title"`, level supplied by the container via `HeadingContext`). `Title` reuses Marigold's `Headline` typography scale via `size` (defaults to `level-3`) so the design system has a single shared heading vocabulary. `Description` defaults to `slot="description"`; `TextValue` to `slot="label"`. Consumers drop these into containers without any `slot` wiring; the container provides level, layout (e.g. a grid area), size overrides, and any other styling via a single `Provider`.

`ActionButton.Group` cascade uses **explicit per-prop precedence** between the group and an enclosed `<ActionButton>`:
- `size`: group wins (visual uniformity within a group).
- `variant`: local wins (so a single destructive action can sit inside a ghost group).
- `disabled`: local wins; the group provides the default. Writing `disabled={false}` on a child re-enables it inside an otherwise-disabled group.

The group publishes its cascade through `ActionButtonGroupContext`; `ActionButtonContext` remains available for app-wide defaults that don't need group semantics.

The architectural rule: use RAC's `HeadingContext` and `TextContext` for text/heading slots; introduce Marigold-owned contexts (`ActionButtonContext`, `ActionButtonGroupContext`, `ActionMenuContext`) only where RAC has no equivalent. Containers can cascade defaults to nested primitives via a single `Provider`.

`ActionMenu` now composes its own `MenuTrigger` + `<ActionButton>` + `Popover` / `Tray` + RAC `Menu` rather than delegating to Marigold's `Menu`. The trigger uses `<ActionButton>` so an outer `ActionButtonContext` cascades to it.

The previous public top-level `ActionButton` export from `ActionBar/` is internalized as `ActionBar.Button` (no consumer-visible change — `ActionBar.Button` continues to work). Consumer container migrations follow in Phase 1+ (Panel — DST-1367; Dialog/Drawer/Tray — DST-1369; ContextualHelp/SectionMessage/EmptyState — DST-1370; ListBox item — DST-1364).

Typography prep: extracts shared type aliases so the heading and body scales have explicit, code-level dependencies rather than convention-only ones. `Headline` exports `HeadlineSize`, which `Title.size` consumes directly. `Text` exports `TextSize` and `TextVariant`. `Description.size` derives from `TextSize` via `Extract<TextSize, ...>`, and `Description.variant` reuses `TextVariant`. A future typography token PR can replace the runtime classes without touching consumer-facing prop types.
