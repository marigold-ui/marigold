---
'@marigold/components': minor
'@marigold/system': minor
'@marigold/theme-rui': minor
---

feat(DST-1391): add `Stepper`, a progress indicator for multi-step tasks.

`<Stepper>` shows where a user stands in a checkout, an onboarding flow, or a multi-page form, replacing the one-off "Step 1 of 4" widgets that several product flows had each built for themselves. It renders a `<nav>` landmark around an ordered list, announces each step's label, position, and state, and never relies on colour alone to convey which step is which.

State is entirely consumer-owned. `completedKeys` is a set rather than a high-water mark, so non-contiguous completion coming from a server is expressible, and the component never infers that a step is finished: only your code knows whether validation passed. `selectableKeys` replaces the built-in "completed, errored, or current" rule when a backend decides what is reachable, and `disabledKeys` always wins over both. Errored steps stay clickable on purpose, so a user who is told a step failed has a way back to it.

Steps with an `href` render as real links and route through `RouterProvider`; steps without one render as buttons. Steps that are not reachable render as plain text rather than as disabled controls, since an unreachable step is not a disabled widget. `hideLabels` drops labels visually for flows with too many steps to label, keeping them for screen readers.
