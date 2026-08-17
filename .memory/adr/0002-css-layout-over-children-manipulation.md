---
id: ADR-0002
status: proposed # proposed | accepted | superseded-by ADR-NNNN
date: 2026-08-17
applies_to:
  - 'packages/components/src/**/*.tsx'
  - 'themes/**/*.styles.ts'
---

# 0002. Place parts with CSS, not by rearranging React children

## Context

A container gives its consumer a flat list of children and has to arrange them in two dimensions. `Panel.Header` receives a title, maybe a description, maybe some actions; it must produce a grid where actions sit to the right and span both text rows.

There are two ways to get there.

**Restructure the React tree.** Read the children, sort them into buckets, wrap each bucket in a positioning `<div>`. In practice that means `Children.toArray`, `isValidElement` type-sniffing, `cloneElement` to inject a class, and a conditional wrapper for every optional part.

**Declare the layout in CSS and let each part name its area.** The container declares `grid-template-areas`; each part carries `[grid-area:…]` (delivered through its slot config — see [ADR-0001](0001-slot-driven-composition.md)). The tree stays flat.

Marigold has consistently taken the second route, and the code shows how far it goes:

- `Panel.Header` / `Page.Header` — `grid-cols-[1fr_auto] [grid-template-areas:'title_actions'_'description_actions']`, with `[grid-area:title|description|actions]` handed to the roles.
- `Drawer`, `ContextualHelp`, `Sidebar`, `SidebarModal` — one `grid-template-areas` each, parts self-placing.
- `AppShell` — the whole application frame reflows on the _presence of a child_, in CSS:

  ```
  [grid-template-areas:'sidebar_header'_'sidebar_main']
  [&:has([data-rail])]:[grid-template-areas:'header_header'_'sidebar_main']
  ```

  With a rail, the top bar spans full width and the sidebar drops below it. Without one, the sidebar runs full height beside the header. **No React code observes this** — no `hasRail` prop, no context, no child inspection. `:has()` does it.

Two properties follow. Optional parts cost nothing: omit the description and its row collapses, with no `hasDescription` branch anywhere. And source order stops mattering — `<AppShell>`'s doc comment says to place `<Sidebar>`, `<TopNavigation>` and `<Page>` in any order because "each owns its own grid area."

React's own documentation pushes the same direction. On `cloneElement` it is blunt: _"Using `cloneElement` is uncommon and can lead to fragile code"_ and _"cloneElement makes it harder to trace the data flow."_ Its recommended alternatives are render props, custom hooks, and **context** — and context is precisely what our slot config is. The pattern we use is the one React tells you to reach for instead of cloning.

The current CSS baseline supports this: `:has()` is broadly available, and pushing this work into the style engine avoids the extra reflow that a measure-then-rearrange pass in JavaScript incurs.

But the repo is not dogmatic, and the exceptions are the useful part. Children _are_ inspected in `Aside`, `Breadcrumbs`, `OverflowRegion`, `Sidebar/collection.ts` and `SidebarRail`. None of those are doing visual placement — they are building collections, measuring overflow, or implementing a RAC collection API.

## Decision

**Default to CSS for placement. Reach for the React tree only when the decision genuinely depends on runtime measurement or collection semantics.**

Use CSS when:

- Parts go into named regions of a container → `grid-template-areas` plus a `[grid-area:…]` per part.
- Layout depends on whether a part is _present_ → `:has()`, or a grid row that collapses when empty.
- Layout depends on available space → container queries, `minmax()`, `auto-fit`. Not a resize observer.

Manipulate children only when:

- The container implements a **collection** with keys, selection or focus management (`Sidebar/collection.ts`, RAC-backed lists).
- The decision needs a **measurement CSS cannot express** — `OverflowRegion` must know how many items actually fit, which requires observing the DOM.
- An **enumerated position** is part of the API contract, e.g. `Aside` taking exactly two children.

When you do manipulate children, prefer `Children.toArray` (stable keys) over `cloneElement`. If a class or a default has to reach a child, pass it through **context** — the slot mechanism in ADR-0001 — rather than cloning the element.

**Never add a boolean prop whose only job is to tell the container what it contains.** `hasHeader`, `hasDescription`, `withActions` are all `:has()` or a collapsing grid row. This is the `CLAUDE.md` "no mode booleans" rule arriving from the layout side.

## Alternatives rejected

**A wrapper `<div>` per region.** The obvious approach: sort children, wrap each group. Rejected because the wrappers are load-bearing but invisible in the consumer's JSX, every optional region needs a conditional, and extra elements between a container and its parts break `grid`/`flex` inheritance and `subgrid`. It also forces the container to type-sniff children to know which bucket each belongs in.

**`cloneElement` to inject placement classes.** Rejected on React's own advice — fragile, opaque data flow — and because it silently fails on Fragments and non-element children, and quietly overrides a `ref` the consumer set. Context delivers the same class without any of that.

**Render props for placement** (`renderHeader`, `renderActions`). Rejected under the composition rules in `CLAUDE.md`: children compose, callbacks make consumers learn a signature. React lists render props as a legitimate `cloneElement` alternative, but for _placement_ the grid already solves it without an API surface.

**A JavaScript-measured layout** (resize observers deciding placement). Rejected for anything CSS can express: it costs a measure-and-reflow cycle per change and reintroduces the layout thrash the grid avoids. `OverflowRegion` is the deliberate exception, and it exists because "how many of these fit" is genuinely not expressible in CSS.

## Consequences

**What this buys.** Containers stay ignorant of what they contain. Optional parts need no branches. Source order is free. The DOM stays shallow, which keeps `grid`, `flex` and `subgrid` inheritance working. Placement changes are theme changes, not component rewrites.

**What it costs.**

- **The layout is not visible in the JSX.** Reading `<Panel.Header>` does not tell you the actions column spans two rows — that lives in a `grid-template-areas` string, sometimes in the theme.
- **Arbitrary-value Tailwind is hard to read.** `[&:has([data-rail])]:[grid-template-areas:'header_header'_'sidebar_main']` is correct and nearly unreadable. It needs a comment; it will not explain itself.
- **`:has()` is a real selector with real cost** when overused on large subtrees. It is right for structural questions, not a general reactivity mechanism.
- **The escape hatch is undefended.** Nothing stops someone adding `Children.toArray` for placement. This record is the only thing pointing at the alternative.
- Grid areas are named strings matched across two places. A typo silently drops a part into `auto` flow rather than erroring — the `data-grid-area` attributes on the slot configs exist partly to make that debuggable.

**Not enforced.** No check verifies any of this. Advisory, like every record here.
