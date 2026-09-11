---
'@marigold/components': patch
---

fix(DST-1665): measure the `<ActionBar>` height so consumers can reserve room for it

`useActionBar` returned `actionBarHeight: 0` for the whole lifetime of a bar that
was closed when it mounted, which is every bar that starts with an empty
selection. `<Table>` reserves that height in `padding-bottom` and
`scroll-padding-bottom`, so the bar covered the last rows and keyboard navigation
parked a focused row underneath it.

The observation ran in the outer `<ActionBar>`, which renders `null` until
something is selected. React Aria's `useResizeObserver` reads `ref.current` when
its effect first runs and declares its dependencies as `[ref, box]`, so a `ref`
that was empty at that moment is never looked at again and the observer never
attaches to an element. It now runs one layer in, in the component that mounts
with the bar itself, so the ref is live and a close-then-reopen cycle
re-establishes the observation.

Nothing to change in consuming code. A `<Table>` with an `actionBar` starts
reserving the room it always claimed to, and `actionBarHeight` reports a real
measurement for anything driving the layout by hand.
