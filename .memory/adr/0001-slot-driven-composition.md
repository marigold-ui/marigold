---
id: ADR-0001
status: proposed # proposed | accepted | superseded-by ADR-NNNN
date: 2026-08-17
applies_to:
  - 'packages/components/src/**/*.tsx'
---

# 0001. Publish a slot config only when the container knows something the consumer cannot

## Context

Marigold has two composition mechanisms that both get called "slots".

**Compound parts** (`Panel.Header`, `Dialog.Trigger`, `Table.Row`) are named exports on the parent. Structure is visible in the JSX and each part is separately typed.

**Slot-driven composition** publishes a slot config on RAC's `HeadingContext` / `TextContext` — `{ slots: { title: {…}, description: {…} } }` — which role primitives (`<Title>`, `<Description>`, `<TextValue>`) consume by declaring a matching `slot`. The consumer writes the same `<Title>` in a `<Dialog>`, a `<Panel>` and a `<Card>`; each container decides what it means there.

Eleven containers publish slot configs today: `Card`, `CardHeader`, `ContextualHelp`, `EmptyState`, `ErrorState`, `Page`, `PageHeader`, `Panel`, `PanelHeader`, `PanelCollapsibleHeader`, `SectionMessage` — plus `useOverlayHeaderSlotProps` for the Dialog/Drawer/Tray family and `useMergedTextSlots` for RAC-managed items (`ListBox.Item`, `SelectList.Option`).

A separate, non-slot-keyed cascade covers actions: Marigold's own `ButtonContext` carries `variant` / `size` / `className` defaults, with `RESET_BUTTON_CONTEXT` to stop it at overlay boundaries.

What makes the mechanism worth its cost is that a slot config carries **semantics, not just styling**:

| Key              | Why the container owns it                                                                                              |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `level`          | The heading outline is a property of the page, not the text                                                            |
| `id` + `ref`     | Wires `aria-labelledby` on the landmark/dialog, and drives `useSlot` presence detection                                |
| `elementType`    | `<p>` inside `Panel.Header`, RAC's `<span>` elsewhere                                                                  |
| `as`             | `<Title>` renders a `<span>` inside `Panel.CollapsibleHeader`'s `<button>` — a heading inside a button is invalid HTML |
| `data-grid-area` | Which cell of the container's grid the part lands in                                                                   |
| `className`      | Theme slot styles, **including the `[grid-area:…]` that positions the part**                                           |

Every one of those is knowledge the container has and the consumer would otherwise have to carry, per container, correctly, forever.

### Slot config is also a layout mechanism

This is the half the [Component Principles](../../docs/content/foundations/component-principles/index.mdx) page under-sells. A slot config does not only decide how a part _looks_ — it decides **where it goes**.

`Panel.Header` and `Page.Header` both declare a two-dimensional grid and hand each role its cell through the slot config:

```
grid grid-cols-[1fr_auto] [grid-template-areas:'title_actions'_'description_actions']
```

with `[grid-area:title]`, `[grid-area:description]` and `[grid-area:actions]` injected into the `title` / `description` / action slots respectively. The consumer writes a flat list of siblings; the host places them in 2D. The same `<Title>` lands in the top-left cell of a `Panel.Header`, in the heading row of a `Dialog`, and — via the `as` key — as a plain `<span>` inside `Panel.CollapsibleHeader`'s `<button>`.

Two properties fall out of this that are easy to miss:

- **Optional parts cost nothing.** Omit the `<Description>` and its grid row collapses. No conditional wrapper, no `hasDescription` branch in the container.
- **Source order stops mattering.** `<AppShell>`'s own doc comment says it outright: place `<Sidebar>`, `<TopNavigation>` and `<Page>` in any order, "each owns its own grid area."

The general rule this implies — position parts with CSS rather than by restructuring the React tree — is broader than slots and is recorded separately in [ADR-0002](0002-css-layout-over-children-manipulation.md).

### The cost: a publishing container is a hazard for structural children

RAC throws `"A slot prop is required when using slots"` for any unslotted `<Heading>` or `<Text>` rendered inside a publishing container. **Publishing a slot config turns the container into a hazard for structural children.** That is why `noSlot` exists (`utils/noSlot.ts`, a `null as unknown as string | undefined` cast), and it is already needed in six places — `AccordionHeader`, `CalendarHeader`, `PanelCollapsibleHeader`, `Title`, `CollapsibleTrigger`, `Headline` — plus a seventh opt-out in `CalendarPresets` for the `ButtonContext` equivalent.

## Decision

**Publish a slot config only when all three hold:**

1. **The container injects semantics or placement, not just appearance.** At least one of `level`, `id`/`ref`, `elementType`, `as`, or a `[grid-area:…]` is involved. A purely cosmetic `className` — colour, weight, spacing — is not enough. Grid placement _is_ enough: where a part sits is the container's business, not the consumer's.
2. **The role is reusable across containers.** _Title_, _description_, _label_, _actions_ — shapes that recur. A part that exists in exactly one container is a compound part.
3. **The alternative is a per-container wrapper.** If skipping slots means shipping `<PanelTitle>`, `<DialogTitle>` and `<CardTitle>` that differ only in level and styling, publish the slot instead.

**Do not publish a slot config when:**

- Only styling crosses the boundary — use a compound part, or theme slot classNames directly.
- The part is specific to one container and cannot appear elsewhere — a compound part is clearer, discoverable on the parent, and separately typed.
- **The region holds arbitrary consumer content.** A body or content area must not publish slots: every `<Heading>` or `<Text>` a consumer nests inside it then throws. This is the rule that keeps `noSlot` from spreading.

**Two obligations on the implementation:**

- **Merge parent slots, never replace them.** RAC puts the `id` behind `aria-describedby` in its own slot config; replacing the entry silently breaks screen-reader description wiring. `useMergedTextSlots` spreads the parent config first for exactly this reason — follow it.
- **Structural primitives default to `noSlot`.** A component that is page chrome rather than a container's role — `<Headline>`, a bare `<Heading>` — sets `slot = noSlot` so it can be nested anywhere without exploding.

## Alternatives rejected

**Per-container compound parts for every role** (`Panel.Title`, `Dialog.Title`, `Card.Title`). Discoverable and type-safe, and it never throws. Rejected because the roles genuinely recur: the same title/description pair appears in eleven containers plus the overlay family, and each new container would add parts that differ only in heading level and class. It also puts the burden of knowing the correct heading level on whoever adds the container.

**Configuration props** (`<Panel title="…" description="…" />`). Simplest to type and impossible to misplace. Rejected under the composition rules in `CLAUDE.md`: the moment a title needs a badge, a tooltip or a link, a string prop becomes a `ReactNode` prop, then a render prop. Children compose; props don't.

**Theme-only cascade** — inject styling through classNames, let consumers set heading levels themselves. Rejected because it silently produces broken heading outlines and unnamed landmarks. The outline is the thing screen-reader users navigate by; it cannot be left to each call site.

## Consequences

**What this buys.** One `<Title>` and one `<Description>` for the whole system instead of a pair per container. Heading outlines and landmark naming come out correct by construction. A new container declares what it supports and gets the primitives for free.

**What it costs.**

- `noSlot` is permanent. It is a deliberate lie to the type system, it needs its explanatory comment, and every structural primitive has to remember it. It will look like a bug to every newcomer.
- Every new slot-publishing container is a new place unslotted children can throw — a runtime error, not a type error.
- Slot configs must be merged rather than replaced, and getting that wrong breaks accessibility **silently**. Nothing enforces it.
- Extending RAC's slot props requires declaration merging into `HeadingProps` (`Title.tsx`), which couples us to RAC's type shape.
- The indirection is real: reading `<Title>` at a call site does not tell you what level it renders at. That answer lives in the container.

**Not enforced.** No check verifies any of the above. This record is advisory; treat it as the reasoning behind a review comment, not a gate.
