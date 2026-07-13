---
'@marigold/components': major
'@marigold/system': major
'@marigold/theme-rui': patch
---

refactor(DST-1548): rename `Card.Body` to `Card.Content`

Aligns the Card body sub-component with `Panel.Content` and `Page.Content` so all three container primitives expose the main body region under one name.

**Breaking change:** `Card.Body` (`CardBody`) is removed. Rename usages to `Card.Content`:

```diff
- <Card.Body>...</Card.Body>
+ <Card.Content>...</Card.Content>
```

The `bleed` prop and padding behavior are unchanged. The internal `data-card-body` attribute has been removed to match `Panel.Content`.

The `Card` theme slot key is renamed from `body` to `content` in the `@marigold/system` `Theme` type and in `@marigold/theme-rui`. Theme authors overriding this slot must rename their key accordingly.
