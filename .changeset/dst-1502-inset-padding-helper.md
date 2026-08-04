---
'@marigold/system': minor
'@marigold/components': patch
---

Extract `resolveInsetAxes` helper to centralise inset-padding axis resolution.

The `p` → `px`/`py` resolution logic (branching on whether the value is a numeric scale or a named token) was copy-pasted across `Page`, `Panel`, and `Card`. This duplication caused the `<Card p={number}>` silent bug (resolving to a non-existent `var(--spacing-4-x)`), the same class of bug that had already been fixed independently in `Panel` (DST-1501) and `Page` (DST-1360).

- Adds `resolveInsetAxes({ p, px, py, defaultInset })` to `@marigold/system` alongside `createSpacingVar`.
- Adopts the helper in `Card`, `Panel`, and `Page`, fixing the live `<Card p={number}>` bug as part of the refactor.
- Fixes the same numeric-`p` bug in `SelectList` (inline, since its conditional-axis pattern differs).
