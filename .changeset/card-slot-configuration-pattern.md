---
'@marigold/components': minor
'@marigold/system': minor
'@marigold/theme-rui': minor
---

feat(DST-1373): adopt the slot-configuration pattern in `Card`

`Card.Header` is now a slot provider: drop a `<Title>` and an optional `<Description>` directly inside it and the header wires up the heading level, id, accessible name, and theme classes automatically. A bare `<Title>` placed directly inside `<Card>` (no `Card.Header` wrapper) is also picked up by the root, so title-only cards can skip the header and still get the right padding and `aria-labelledby` wiring. `<Card>` itself now renders an `<article>` landmark and is automatically labelled by its `<Title>` via `aria-labelledby`, or by an explicit `aria-label`. A new `headingLevel` prop (default `3`) controls the underlying heading tag for the document outline.

The theme `Card` slot map gains `title` and `description` entries — the typography previously carried on the `header` slot has moved to `title`. Variant text color now flows through a new `--card-accent` CSS custom property, so `master` and `admin` cards pick up the matching accent automatically. Raw `<Stack>` / `<Headline>` composition inside `Card.Header` still renders but does not pick up the slot wiring; prefer `<Title>` / `<Description>` going forward.
