---
'@marigold/components': patch
---

refactor(DST-1367): Panel adopts the slot-configuration pattern

`Panel.Header` is now a single `<Provider>` that configures `HeadingContext`, `TextContext`, `ActionButtonContext`, and `ActionGroupContext` for everything nested inside it. Consumers drop slot-aware primitives directly into the header — `<Title>`, `<Description>`, and any of `<ActionButton>`, `<ActionGroup>`, `<ActionMenu>`, `<LinkButton>` — and the Panel injects level, ids, ref wiring, grid-area positioning, and the action cascade via context.

The three compound sub-components that paired with `Panel.Header` are removed because slot-aware role primitives subsume their responsibilities:

- `<Panel.Title>` → use `<Title>`.
- `<Panel.Description>` → use `<Description>`.
- `<Panel.HeaderActions>` → drop the wrapper; the action primitives themselves (`<ActionButton>`, `<ActionGroup>`, `<ActionMenu>`, `<LinkButton>`) land in the actions grid cell via the context className that `Panel.Header` publishes.

Multiple actions belong inside an `<ActionGroup>` — the cluster claims one cell and renders as a toolbar. A raw `<Button>` inside `Panel.Header` is intentionally _not_ slot-aware: it stays as a footgun so the action primitives are the obvious choice for header chrome.

`Panel.Collapsible*` is unchanged. `CollapsibleTitle` and `CollapsibleDescription` render as `<span>` inside the disclosure trigger button, which is structurally incompatible with `<Title>`'s `<Heading>` output, so they stay as compound sub-components owned by Panel.
