---
id: ADR-0003
status: accepted # accepted | superseded-by ADR-NNNN
date: 2026-08-17
applies_to:
  - 'packages/components/src/**/*.tsx'
  - 'themes/**/*.styles.ts'
---

# 0003. Stacking order belongs to components, not themes

## Context

Z-index used to live wherever it was convenient. Some components set it inline; some `theme-rui` `*.styles.ts` files carried `z-*` utilities alongside colour and spacing. Because a theme could set it, a theme could change it.

That is the problem, and it is not an aesthetic one. **Stacking order encodes correctness, not taste.** A toast must render above a modal or the user cannot see what the system is telling them. A tooltip must render below a modal or it paints over a dialog the user is trying to read. Those are behavioural guarantees of the component, in the same category as focus trapping — and putting them in a theme makes them a per-theme opinion, so a second theme can break overlays without touching a line of component code.

DST-1547 moved every `z-*` utility out of the theme style files and into the component implementations, for `Calendar`/`RangeCalendar`, `LegacyTable`, `ListBox`, `Table`, `ToggleButton` and `SegmentedControl`. The changelog states the reason plainly: it "ensures consistent stacking order across all themes and makes z-index behavior theme-independent". An earlier pass (DST-1406) had already shown how sharp the edges are — RAC's virtualizer sets an inline `z-index: 0` per item, creating a stacking context a `focus-visible:z-1` inside it cannot escape, which clipped focus outlines in every virtualized listbox.

Two facts about the mechanism matter for reading the code:

- The classes are **plain Tailwind v4 numeric utilities** (`z-1`, `z-30`, `z-80`). Tailwind v4 generates `z-<integer>` on demand, so there are no `--z-*` custom properties and no `theme.css` entries backing them. The scale is a **shared convention, not a token set** — which is precisely why it needs writing down somewhere.
- The layers themselves are listed in [`CLAUDE.md`](../../CLAUDE.md) under "Z-Index Management". They are **not** repeated here; a scale copied into two files is a scale that will disagree with itself.

## Decision

**Apply z-index in the component implementation, never in a theme style file.** `packages/components/src/**` may carry `z-*` utilities; `themes/**/*.styles.ts` may not. Compose with `cn()` alongside the classNames the theme supplies.

**Use the layer scale in `CLAUDE.md`.** Pick the rung that matches the component's role, rather than a number that happens to work against whatever it currently overlaps.

**Treat a stacking relationship as a component guarantee.** If a change would let a toast fall behind a modal, that is a defect in the component, not a theming choice — regardless of which file it is expressed in.

**One documented exception: a utility that is genuinely CSS, not a component.** `ui-touch-hitbox` sets `z-index: 100` in `themes/theme-rui/src/ui.css`, because the pseudo-element it stacks has no React component to own it. The rule targets `*.styles.ts` — theme _style definitions consumed by components_ — not every file in `themes/`. A new exception needs the same justification: there must be no component that could own it.

**Prefer not raising a z-index to fix a paint order.** An element that will not come forward is usually trapped in an ancestor's stacking context, and raising its own value cannot escape one. Find the ancestor; DST-1406 is the worked example.

## Alternatives rejected

**Keep z-index in theme style files, next to the other styles.** Cohesive — everything visual about a component in one place — and it was the status quo until DST-1547. Rejected because it makes a correctness property overridable per theme. A theme author changing a colour scale should not be able to put a tooltip above a modal, and with `z-*` in `*.styles.ts` there is nothing stopping them from doing it by accident.

**Define `--z-*` custom properties in `theme.css` and reference them.** The conventional design-token answer, and it reads well. Rejected because Tailwind v4 already generates `z-<integer>` on demand, so the tokens would add an indirection layer that buys nothing — and, more importantly, putting the values in the theme is the same mistake as the option above wearing token clothing. Themes should not be able to reorder the stack.

**A named semantic scale** (`z-overlay`, `z-toast`) via Tailwind theme extension. Genuinely more readable at the call site, and it was tempting. Rejected because it requires a token layer to exist for the reason just given, and because the numbers already carry the ordering: `z-80` is above `z-50` by inspection, whereas `z-toast` above `z-modal` is only knowable by looking the scale up.

**No convention — set what each situation needs.** What produced the original mess. Rejected for the obvious reason: every value becomes a local negotiation with whatever it currently overlaps, and the result only holds until something new appears between them.

## Consequences

**What this buys.** Stacking behaves identically under every theme. The order is discoverable by reading the component, which is also where the behaviour that depends on it lives. A theme package cannot introduce an overlay bug.

**What it costs.**

- **A rule with a shape people do not expect.** "Styling goes in the theme" is otherwise near-absolute in this codebase; z-index is the exception, and it looks like an oversight until you know why. Expect `z-*` to be "tidied" back into `*.styles.ts`.
- **Nothing enforces either half.** No check rejects `z-*` in a `*.styles.ts` file, and none verifies that a component picked the right rung. Both are review-time concerns.
- **The scale is a convention, so rungs drift.** Nothing requires a layer to be used, or requires a component that should be on one to be on it. The list in `CLAUDE.md` documents intent, and intent and usage can diverge silently — an audit is the only way to find out.
- **The exception is a real hole.** `ui.css` demonstrates that theme files _can_ set z-index when a component cannot own the element. The justification bar is stated above, but it is prose, and prose is not a gate.
