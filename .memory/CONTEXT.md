# Glossary

What our terms mean, so an agent does not have to re-derive them — or guess — every session.

Conventions and the boundary with `CLAUDE.md` are in [README.md](README.md). In short: one term per `###` heading, alphabetical, definitions only. Rules belong in `CLAUDE.md`.

<!--
Entry shape:

### Term

What it means, in one or two sentences.

Not to be confused with <neighbouring term>, which is <distinction>.
-->

### Compound part

A named sub-component exported on its parent and rendered explicitly by the consumer: `Panel.Header`, `Dialog.Trigger`, `Table.Row`. The structure is visible in the JSX and each part carries its own typed props.

Not to be confused with a role primitive, which is a standalone component that adapts to whichever container it sits in. A compound part belongs to exactly one parent; a role primitive belongs to none.

### Grid area

A named region of a container's `grid-template-areas`, which a part claims with `[grid-area:<name>]`. Parts stay flat siblings in the DOM and the grid places them, so source order carries no meaning and an omitted part collapses its row.

Not to be confused with the `<Grid>` component's `areas` prop, which exposes the same CSS feature as a public layout API. Grid areas in this sense are internal to a container's own composition.

### Role primitive

A standalone component that carries a _role_ rather than a position — `<Title>`, `<Description>`, `<TextValue>` — and picks up its appearance, semantics and placement from whichever container it is rendered in. The same `<Title>` is an `<h2>` in a `<Panel>` and a `<span>` inside `Panel.CollapsibleHeader`'s button.

### Slot config

The object a container publishes on a slot-keyed context, keyed by role name: `{ slots: { title: {…}, description: {…} } }`. Each entry carries what the container knows and the consumer should not have to — heading `level`, `id` and `ref` for ARIA wiring, `elementType`, `as`, and the `className` that includes the part's grid area.

Not to be confused with a theme slot, which is a named style entry in a theme component (`Panel.title`). A slot config may _carry_ a theme slot's className, but it also carries semantics and placement.

### Slot-driven composition

Composing a container from role primitives that read a slot config, instead of from parts named after the container. `<Dialog>` declares which roles it supports; the consumer drops in `<Title>` and `<Description>` without knowing what either means there.

Not to be confused with compound-part composition, where the consumer reaches for `Dialog.Title`. The two coexist: containers are usually assembled from compound parts, and the _roles inside_ those parts are filled by primitives.
