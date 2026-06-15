---
'@marigold/components': patch
---

fix(DSTSUP-261): make `Tray` immune to a split react-aria `HiddenContext` (mobile `Select` tray selecting nothing)

On a touch/mobile viewport, `Select` (and other components that fall back to a `Tray`) could open an empty bottom sheet next to the real one: tapping an option selected nothing, the trigger kept showing the placeholder, and the page was left `inert` until reload.

Root cause was a dependency-resolution split, not component logic. `Tray` guards the collection hidden pass with `useIsHidden()` from `@react-aria/collections` (which depends on `react-aria` via a caret range), while `react-aria-components` pins `react-aria` exactly and its `Select` (a `createHideableComponent`) sets the `HiddenContext` from its own copy. Both read that context from `react-aria/private/collections/Hidden`, so they only agree when `react-aria` resolves to a single version. When a consumer's lockfile resolves the two edges to different `react-aria` generations, the guard reads a context the collection renderer never sets: it never fires, a duplicate (empty) tray modal leaks into the DOM, and the two modals `inert` each other so options are no longer hit-testable.

`Tray` now verifies the hidden pass through the DOM as well: react-aria renders the hidden pass into a `<template>` element, whose content lives in a detached `DocumentFragment`. A hidden probe element rendered alongside the modal is therefore never connected to the document during the hidden pass, and the tray skips mounting its modal whenever the probe is detached. This holds no matter how the consumer's lockfile resolves `react-aria` — including future react-aria releases that would re-arm the split (`@react-aria/collections`' caret range resolves to the newest `react-aria`, while `react-aria-components` stays pinned) — so no dependency pins are needed.

The durable upstream fix is for react-aria-components' `Modal` to skip the collection hidden pass like its `Popover` already does (which is why the desktop `Popover` path was never affected), or for it to export `useIsHidden`. Once either lands, the guard in `Tray` can be reduced again.
