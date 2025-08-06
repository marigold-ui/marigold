---
"@marigold/docs": patch
"@marigold/components": patch
---

refa([DST-916]):  Remove `<Header>` component and replace with native `<header>`

## Breaking Change: `<Header>` component removed

The `<Header>` component has been removed from Marigold.
Please replace it with the native HTML `<header>` element.

Example migration:

**Before**
```tsx
<Header>
  <h1>Page title</h1>
</Header>
```

**After**

```tsx
<header>
  <h1>Page title</h1>
</header>
```
