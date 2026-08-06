---
'@marigold/components': major
'@marigold/theme-rui': major
---

feat(DST-1545): replace `ActionBar.Button` with a plain `<Button>` via a `ButtonContext` cascade. `ActionBar` now provides a `ghost`/`default` cascade to its toolbar, so authors place a standard `<Button>` inside the bar and it adapts to the toolbar look automatically, with the full Button API available (`disabled`, `loading`, `slot`, `size="icon"`). This mirrors the pattern already used by `Panel.Header` and `ButtonGroup`.

**Breaking:** `ActionBar.Button` is removed. Replace `<ActionBar.Button>…</ActionBar.Button>` with `<Button>…</Button>`. For icon-only actions use `<Button size="icon" aria-label="…">`, which also fixes an accessibility defect where the old wrapper silently dropped `aria-label`, shipping unlabeled icon buttons. The duplicated `actionButton` theme style is gone (it hand-mirrored Button's `ghost` variant at the default size, minus the press and loading affordances a real `<Button>` now brings).

```tsx
// Before
<ActionBar selectedItemCount={3} onClearSelection={clear}>
  <ActionBar.Button onPress={edit}>
    <Pencil /> Edit
  </ActionBar.Button>
</ActionBar>

// After
<ActionBar selectedItemCount={3} onClearSelection={clear}>
  <Button onPress={edit}>
    <Pencil /> Edit
  </Button>
</ActionBar>
```
