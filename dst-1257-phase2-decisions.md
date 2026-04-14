# DST-1257 Phase 2 — Decision Log

Changes from the original implementation plan, made during design review before Phase 2 implementation.

## Renamed: `danger` variant → `destructive`

The original plan used `variant="danger"`. Renamed to `variant="destructive"` for semantic parity with button variants (`<Button variant="destructive">`). Signals that the panel wraps an irreversible/destructive action, not a generic warning. Same tokens: `--color-destructive-*`. No new `warning` variant in v1.

## Collapsible API: `title` prop → D-flat compound

Original plan had a simple `title` prop on `Panel.Collapsible`:

```tsx
// Before
<Panel.Collapsible title="Advanced" defaultExpanded>
  <Table />
</Panel.Collapsible>
```

Changed to a flat compound with three sub-components:

```tsx
// After
<Panel.Collapsible defaultExpanded>
  <Panel.CollapsibleTrigger>Advanced</Panel.CollapsibleTrigger>
  <Panel.CollapsibleContent inset="none">
    <Table />
  </Panel.CollapsibleContent>
</Panel.Collapsible>
```

**Why:** Allows rich trigger content (badges, icons, trailing text) without a polymorphic `title` prop. `Panel.CollapsibleContent` gets its own `inset` prop for edge-to-edge tables inside collapsibles. Naming uses `Trigger` (matching RAC + Marigold `Collapsible`) rather than Accordion's `Header`.

## `inset` mechanism: CVA variant → `createSpacingVar`

Original plan implied `inset` as a CVA variant in `Panel.styles.ts`. Changed to follow the existing `Inset.tsx` pattern: `createSpacingVar('inset', token)` sets a CSS variable, Tailwind `p-(--inset)` reads it. No inset-related entries in the theme file.

**Why:** Consistent with `Inset`, `Stack`, `Inline` spacing props. `inset="none"` resolves to `padding: 0` via Phase 1's `--spacing-none` token — no special-casing needed.

## Context shape: dropped `setTitleId`, added `hasTitle` + `titleLevel`

Original plan had `setTitleId` in context (reverse flow from Title to root). Dropped — root generates `titleId` via `useId()`, Title consumes it. Added `hasTitle` (boolean) and `titleLevel` (number) so Collapsible can auto-derive its heading level.

## Heading levels: auto-derived for accessibility

- `Panel.Title` renders at its `level` prop (default 2) and writes `titleLevel` + `hasTitle` into context.
- `Panel.CollapsibleTrigger` renders at `titleLevel + 1` when Title is present, else at `titleLevel`.
- Ensures a correct heading outline: Title h2 → Collapsible h3 (nested); no Title → Collapsible h2 (top-level).

**Why:** "Always h3" would skip h2 in Collapsible-only panels. "Always h2" would create false siblings when Title is also h2.

## `aria-label` support on root

Not in original plan. Panel now accepts `aria-label` as an alternative to `Panel.Title` for labeling the `<section>`. Required for Collapsible-only panels that have no visible Title.

**Hard rule:** Panel must have either a visible `Panel.Title` or an `aria-label` — enforced via `React.Children` inspection at render (no `useEffect`, following react-aria patterns).

## Header layout: CSS grid (not flexbox)

Original plan said "internal flex row". Changed to CSS grid with named areas: `grid-template-columns: 1fr auto; grid-template-areas: "title actions" / "description actions"`. Actions placed via `grid-area` — JSX source order is irrelevant. Empty Actions auto-collapses the `auto` column.

**Why:** Grid areas make slot placement predictable regardless of authoring order. No child-detection logic needed for Actions presence.

## Slot dividers: `[&:not(:first-child)]:border-t`

Not specified in original plan. Applied on Content / Collapsible / Footer siblings to create dividers between any adjacent slots. Works for every permutation (Collapsible-only, no Footer, etc.) without conditional logic.

## `forwardRef`: skipped in v1

Original plan called for `forwardRef` on root. Dropped for all sub-components and root in v1 to reduce complexity. Will re-add if a real consumer need surfaces.

## Required-slot enforcement: relaxed

Original plan listed `Panel.Header` + `Panel.Title` + `Panel.Content` as required. Relaxed to: only hard rule is "Title or aria-label must be present". Content, Header, Footer are all consumer choice. Supports Collapsible-only panels.

## Theme styles structure: plain object of `cva()` calls

Original plan said `cva({ slots, variants })`. Changed to a plain object with one `cva()` per slot (mirroring `Accordion.styles.ts`), matching the existing Marigold multi-slot theme pattern.

## ClassNames distribution: Accordion pattern (context)

Root calls `useClassNames({ component: 'Panel', variant })` once, puts the slotted result in context. Sub-components read their slot via `ctx.classNames.title`, etc. (Same as `Accordion`, not the per-sub-component `useClassNames({ context })` pattern used by `Collapsible`.)

**Why:** Fewer hook calls. Context-based distribution is the pattern for compound components with many slots in this codebase.
