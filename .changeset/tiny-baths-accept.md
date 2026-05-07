---
'@marigold/components': major
'@marigold/theme-rui': major
'@marigold/system': major
'@marigold/docs': major
---

refa([DST-1162]): **Breaking changes**: The `Card` component has been refactored into a compound component pattern.

**What changed:**
- The previous prop-based API (`padding`, `space`, etc.) has been removed.
- Content must now be composed using explicit sub-components: `Card.Header`, `Card.Body`, `Card.Footer`, and `Card.Preview`.
- A `CardContext` is now required — sub-components will throw an error if used outside of a `<Card>`.

**Migration:**
```tsx
// Before
<Card>
  <SomeContent />
</Card>

// After
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body><SomeContent /></Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>
```
