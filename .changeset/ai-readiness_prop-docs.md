---
'@marigold/components': patch
---

docs(ai-readiness): describe the props that had no documentation

About 160 props had no description, so an editor tooltip, the props tables in the docs and an AI agent reading the type declarations showed only a name and a type. This affected `variant` and `size` on most components, `ref`, `children` and a few others, such as the `title`, `description` and `action` of a toast. They are described now. Nothing changes at runtime and no types change.
