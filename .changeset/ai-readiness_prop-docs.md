---
'@marigold/components': patch
---

docs(DST-1981): describe the props that had no documentation

About 160 props had no description, so an editor tooltip, the props tables in the docs and an AI agent reading the type declarations showed only a name and a type. This affected `variant` and `size` on most components, `ref`, `children` and a few others, such as the `title`, `description` and `action` of a toast. Most of them are described now. About 70 still have none, mostly on building blocks such as `FieldBase`, `Input` and `Popover`, plus the shared `slot` prop. Nothing changes at runtime and no types change.
