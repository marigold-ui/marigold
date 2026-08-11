---
'@marigold/components': minor
---

fix(Select, ComboBox, TagGroup, TagField, Autocomplete): expose `dependencies`

Collections cache each rendered item against the item object, so a render
function that reads anything else — a label from state, a lookup by id — keeps
rendering the value it first saw. React Aria's escape hatch is `dependencies`,
listed like a hook's dependency array, but it only exists on the collection
components themselves. These five own their collection internally, so there was
no way to reach it: the option or tag went stale and stayed stale.

They now accept `dependencies` and forward it to every collection they render,
including the tray and popover copies. Nothing changes for tables of static
children or for items that are replaced rather than mutated.

```tsx
<Select items={people} dependencies={[shift]}>
  {person => <Select.Option id={person.id}>{person.name} — {shift}</Select.Option>}
</Select>
```
