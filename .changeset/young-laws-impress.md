---
"@marigold/docs": patch
"@marigold/components": patch
---

refa([DST-915]): Remove `Footer` component

## Breaking Change: `<Footer>` component removed

The `<Footer>` component has been removed from Marigold.  
Please replace it with the native HTML `<footer>` element.

**Before**
```tsx
<Footer>
  <p>© 2025 Company Name</p>
</Footer>
```

After

```tsx
<footer>
  <p>© 2025 Company Name</p>
</footer>
```
