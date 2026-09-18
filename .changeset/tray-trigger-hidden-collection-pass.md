---
'@marigold/components': patch
---

fix: keep `Tray.Trigger` children alive during a collection's hidden pass

`Select`, `ComboBox`, `Autocomplete` and the `Calendar` presets render their children twice: once into a `<template>` to build the collection, then for real. On a small screen those children are wrapped in a `Tray.Trigger`, and react-aria-components 1.21 made its `DialogTrigger` return `null` during that hidden pass. The `<ListBox>` holding the options went with it, so the collection built empty and the tray opened with nothing in it.

`Tray.Trigger` now renders its children bare during the hidden pass instead of going through `DialogTrigger`, which is what `Tray` itself already did. The options register again and the tray opens populated.

The guard `Tray` used for this moved into a shared `useIsHiddenTree` hook, so both components share one copy of the `useIsHidden` context check and the DOM probe that backs it up when two react-aria generations split that context.
