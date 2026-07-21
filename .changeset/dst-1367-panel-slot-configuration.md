---
'@marigold/components': patch
---

refactor(DST-1367): Panel adopts the slot-configuration pattern

`Panel.Header` is now a single `<Provider>` that configures `HeadingContext`, `TextContext`, `ActionButtonContext`, and `ActionGroupContext` for everything nested inside it. Consumers drop slot-aware primitives directly into the header — `<Title>`, `<Description>`, and any of `<ActionButton>`, `<ActionGroup>`, `<ActionMenu>`, `<LinkButton>` — and the Panel injects level, ids, ref wiring, grid-area positioning, and the action cascade via context.

The compound sub-components that paired with `Panel.Header` are removed because slot-aware role primitives subsume their responsibilities:

- `<Panel.Title>` → use `<Title>`.
- `<Panel.Description>` → use `<Description>`.
- `<Panel.HeaderActions>` → drop the wrapper; the action primitives themselves (`<ActionButton>`, `<ActionGroup>`, `<ActionMenu>`, `<LinkButton>`) land in the actions grid cell via the context className that `Panel.Header` publishes.

Multiple actions belong inside an `<ActionGroup>` — the cluster claims one cell and renders as a toolbar. A raw `<Button>` inside `Panel.Header` is intentionally _not_ slot-aware: it stays as a footgun so the action primitives are the obvious choice for header chrome.

`Panel.CollapsibleHeader` adopts the same shape: `<Panel.CollapsibleTitle>` / `<Panel.CollapsibleDescription>` are removed in favour of plain `<Title>` and `<Description>` inside the header. `Panel.CollapsibleHeader` publishes slot-keyed `HeadingContext` and `TextContext` inside its disclosure trigger so the primitives render as spans (matching the heading-inside-button constraint), while the structural `<hN>` semantics come from `Panel.CollapsibleHeader` itself.

`<Description>` now honours `elementType` from its surrounding `TextContext` slot config. `Panel.Header` delivers `elementType: 'p'` so the description renders as a paragraph; `Panel.CollapsibleHeader` delivers `elementType: 'span'` so it nests cleanly inside the disclosure trigger button. Elsewhere, `<Description>` continues to render as RAC's default `<span>`.

`<Headline>` now defaults to opting out of any surrounding `HeadingContext` slot config (`slot` defaults to the no-slot opt-out instead of `undefined`). This avoids "A slot prop is required" runtime crashes when a bare `<Headline>` is rendered inside a container that publishes a slot-keyed `HeadingContext` — such as a `<Panel>` that publishes its `title` slot at the root. An explicit `slot` prop on `<Headline>` still overrides the default.
