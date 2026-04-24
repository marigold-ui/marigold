---
'@marigold/components': major
'@marigold/theme-rui': minor
---

feat(SelectList)!: standardized API, item layout, and visual distinction from ListBox (DST-1076)

`<SelectList>` has been refined into a first-class form field for picking one or many items from a visible list of rich two-line rows. This release contains breaking renames and a tightened type surface.

**Breaking changes**

- `SelectList.Item` → **`SelectList.Option`**. The option semantic matches `Select.Option` and the HTML `<option>` mental model. Update any `<SelectList.Item>` usage to `<SelectList.Option>`.
- `SelectList.Action` has been **removed**. Drop your `<ActionMenu>` or `<IconButton>` directly inside `<SelectList.Option>` — the component positions, sizes, and styles the nested control automatically via `ButtonContext`. Limit: one action per option (multi-button groups will arrive with a future `ActionButtonGroup`).
- Leading-image slot has been **removed**. Compose images inside `<Text slot="label">` (or anywhere in children) as you see fit.
- `selectionMode="none"` is no longer accepted. `SelectList` is a form field; the default is now `"single"`.
- `onChange` is strictly typed per `selectionMode`: `(key: Key | null) => void` for single, `(keys: Key[]) => void` for multiple. The shape matches `Select<T, M>`. Passing `setState` directly may require adapting the callback.

**Other changes**

- **Selection indicator** — single-select rows render a visible radio circle; multi-select renders a checkbox.
- **Label & description slots** — use `<Text slot="label">` and `<Text slot="description">` inside `<SelectList.Option>`. The row skeleton is `selection · label + description · action (optional)`.
- **Dev-mode warning** when `textValue` is missing on an option whose children aren't a plain string.
- **Own theme entry** — `SelectList` ships a dedicated theme component. The theme exposes first-class `label`, `description`, and `action` entries; slot styling no longer uses descendant selectors. Consumers with custom themes must add or update a `SelectList` entry.

**Migration**

```diff
- <SelectList selectionMode="none">
-   <SelectList.Item id="free">
-     <SelectList.Action>
-       <IconButton aria-label="Info"><Info /></IconButton>
-     </SelectList.Action>
-     Free
-   </SelectList.Item>
- </SelectList>
+ <SelectList selectionMode="single">
+   <SelectList.Option id="free">
+     Free
+     <IconButton aria-label="Info"><Info /></IconButton>
+   </SelectList.Option>
+ </SelectList>
```
