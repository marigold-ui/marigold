---
'@marigold/components': minor
'@marigold/system': minor
'@marigold/theme-rui': minor
---

feat(DST-1373): adopt the slot-configuration pattern in `Card`

`Card.Header` is now a slot provider: drop a `<Title>`, optional `<Description>`, and optional action primitives (`<ActionButton>`, `<ActionGroup>`, `<ActionMenu>`) directly inside it and the header arranges them in a two-column grid (title/description on the left, actions on the right). `<Card>` itself now renders an `<article>` landmark and is automatically labelled by its `<Title>` via `aria-labelledby`, or by an explicit `aria-label`. A new `headingLevel` prop (default `3`) controls the underlying heading tag for the document outline.

`Card.Footer` cascades `size="small"` to descendant `<ActionButton>` / `<ActionGroup>` so footer actions stay visually compact next to the body.

The theme `Card` slot map gains `title`, `description`, and `actions` entries — the typography previously carried on the `header` slot has moved to `title`. Raw `<Stack>` / `<Headline>` composition inside `Card.Header` still renders but does not pick up the slot wiring; prefer `<Title>` / `<Description>` going forward.
