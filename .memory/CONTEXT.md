# Glossary

What our terms mean, so an agent does not have to re-derive them — or guess — every session.

Conventions and the boundary with `CLAUDE.md` are in [README.md](README.md). In short: one term per `###` heading, alphabetical, definitions only. Rules belong in `CLAUDE.md`.

<!--
Entry shape:

### Term

What it means, in one or two sentences.

Not to be confused with <neighbouring term>, which is <distinction>.
-->

### App chrome

The persistent furniture around an application's content — the sidebar, the top navigation, the page header. "Chrome" is used at every scale in this codebase, always relative to some content boundary: a dialog has chrome (its header padding), a page has chrome, an application has chrome.

Not to be confused with a frame, which is a specific component. Chrome is a _role_ something plays and never a component name — see [ADR-0002](adr/0002-app-chrome-vs-frame.md).

### Compound component

A component whose parts are named exports on the parent and rendered explicitly by the consumer: `Panel.Header`, `Dialog.Trigger`, `Table.Row`. The structure is visible in the JSX and each part carries its own typed props. An individual part is a _compound part_.

Not to be confused with a role primitive, which is standalone and adapts to whichever container it sits in. A compound part belongs to exactly one parent; a role primitive belongs to none.

### Frame

The outer structural container of an application: `<AppShell>`. It owns named grid areas and the sidebar provider, and nothing else. One per application.

Not to be confused with app chrome, which is the furniture the frame arranges. The frame also contains the page area, which is content rather than chrome.

### Grid area

A named region of a container's `grid-template-areas`, which a part claims with `[grid-area:<name>]`. Parts stay flat siblings in the DOM and the grid places them, so source order carries no meaning and an omitted part collapses its row.

Not to be confused with the `<Grid>` component's `areas` prop, which exposes the same CSS feature as a public layout API. Grid areas in this sense are internal to a container's own composition.

### Internal export

A runtime export kept in a package barrel (`packages/*/src/index.ts`) for composition by other Marigold packages rather than for consumers: the field parts, the overlay primitives, the slot contexts, the style-prop maps and the CSS-variable helpers. It carries a bare `/** @internal */` on the barrel line, which the Insights scanner reads from the barrel source to keep these out of the "unused" metrics and to flag direct consumer usage. The tag says nothing about stability and does not survive the build: tsdown collapses the barrel into one export statement, so the published package is unchanged.

Not to be confused with a deprecated export, which is public API on its way out and documented as such.

### RAC-first imports

The principle that when `react-aria-components` re-exports an API, we import it from there rather than from the `@react-aria/*` shell packages — because RAC pins its internals exactly while the shells keep caret ranges, so the shells can resolve to a second `react-aria` copy and split a context.

Not to be confused with a blanket ban on `@react-aria/*`. `packages/system` has no RAC dependency and uses the shells by design; the actual requirement is that a provider and its consumer resolve to the same module instance. See [ADR-0001](adr/0001-rac-first-imports.md).

### Role primitive

A standalone component that carries a _role_ rather than a position — `<Title>`, `<Description>`, `<TextValue>` — and picks up its appearance, semantics and placement from whichever container it is rendered in. The same `<Title>` is an `<h2>` in a `<Panel>` and a `<span>` inside `Panel.CollapsibleHeader`'s button.

### Slot config

The object a container publishes on a slot-keyed context, keyed by role name: `{ slots: { title: {…}, description: {…} } }`. Each entry carries what the container knows and the consumer should not have to — heading `level`, `id` and `ref` for ARIA wiring, `elementType`, `as`, and the `className` that includes the part's grid area.

Not to be confused with a theme slot, which is a named style entry in a theme component (`Panel.title`). A slot config may _carry_ a theme slot's className, but it also carries semantics and placement.

### Slot-driven composition

Composing a container from role primitives that read a slot config, instead of from parts named after the container. `<Dialog>` declares which roles it supports; the consumer drops in `<Title>` and `<Description>` without knowing what either means there.

Not to be confused with compound-component composition, where the consumer reaches for `Dialog.Title`. The two coexist: containers are usually assembled from compound parts, and the _roles inside_ those parts are filled by primitives.

### Theme component

A theme's entry for one component, keyed by component name and holding either a single style function or a set of named slots — `Panel: { container: cva(…), title: cva(…) }`. Components read it through `useClassNames({ component: 'Panel', variant, size })`, which returns a string for a single-style component and an object of slot classNames for a multi-slot one.

Not to be confused with a theme slot, which is one named entry _inside_ a theme component. Note also that z-index never appears in a theme component — stacking lives in the component implementation, per [ADR-0003](adr/0003-z-index-scale.md).

### Trigger props

The props of a `.Trigger` compound part — `Drawer.Trigger`, `Tray.Trigger`, `Dialog.Trigger`. Each wraps RAC's `DialogTrigger`, takes the trigger element and the overlay as its two children, and re-exposes RAC's controlled-open prop under the house naming: `isOpen` is omitted and `open` offered instead.

Not to be confused with the props of the triggering element itself (a `<Button>`'s `onPress`, say). Trigger props configure the open/close relationship, not the control that fires it.
