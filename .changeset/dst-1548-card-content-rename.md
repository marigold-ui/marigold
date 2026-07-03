---
'@marigold/components': major
---

refactor(DST-1548): rename `Card.Body` to `Card.Content`

Aligns the Card body sub-component with `Panel.Content` and `Page.Content` so all three container primitives expose the main body region under one name.

**Breaking change:** `Card.Body` (`CardBody`) is removed. Rename usages to `Card.Content`:

```diff
- <Card.Body>...</Card.Body>
+ <Card.Content>...</Card.Content>
```

The `bleed` prop and padding behavior are unchanged. Theme authors targeting the body slot must rename the `Card` theme slot key from `body` to `content`. The internal `data-card-body` attribute has been removed to match `Panel.Content`.
