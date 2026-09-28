---
'@marigold/components': minor
'@marigold/docs': patch
---

feat(DST-1747): add an `addon` slot to every form field label

Every form field now takes an `addon` at the end of its label, such as a `<Badge>` or a `<ContextualHelp>`. A badge there is sized automatically, so it no longer needs `size="inline"`, and the label row keeps the height of a bare label.

```tsx
<Select label="Associated Team" addon={<Badge variant="master">Master</Badge>} />
```

`Checkbox`, `Radio` and `Switch` rename their `badge` slot to `addon`. Replace `badge={…}` with `addon={…}`.

The addon is no longer part of the field's accessible name. A badge is read as the field's description instead. `FileField` doesn't announce its addon yet. The required indicator now sits before the addon.
