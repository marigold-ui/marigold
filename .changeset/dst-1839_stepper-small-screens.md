---
'@marigold/components': major
'@marigold/system': major
'@marigold/theme-rui': major
'@marigold/cli': patch
---

feat(DST-1839): give `Stepper` a compact layout on small screens and animated step changes

On phones the stepper no longer overflows its container. Below the small-screen breakpoint it switches on its own to a track with one segment per step, with a "Step 2 of 4" counter and the name of the current step below it, so any number of steps fits and the user always sees where they are. Finished steps stay tappable, and a step that failed earlier turns red and is counted on an extra line below. `hideLabels` now only affects large screens, because small screens show the current step's label anyway.

Moving to another step now fills the line toward it and glides the highlight to the new step, with the same timing as the `Tabs` indicator. The motion is turned off when the user prefers reduced motion. A failed step that is current now gets the current fill on large screens too, with its warning icon on top, instead of a red outline.

Nothing changes in the component API, and apps using `@marigold/theme-rui` need no code changes. Upgrade `@marigold/components` and `@marigold/theme-rui` together.

**BREAKING CHANGE:** the `Stepper` theme entry has seven new required slots.

- **Before:** `Stepper` had the slots `container`, `item`, `link`, `marker`, `label`, `connector` and `count`.
- **After:** it also has `root`, `summary`, `errorCount`, `currentLabel`, `segment`, `progressFill` and `currentIndicator`. The stepper's layout, the small-screen parts and the fill of the current marker now come from these slots. `@marigold/theme-rui` is already updated.

### Migrating a custom theme

Every theme maintained outside this repository that defines `Stepper` needs the seven new slots. After upgrading, run `marigold migrate` from the project root. It adds them with styles that keep the theme's current row on every screen size. The component hides the small-screen parts until a theme styles them, so most slots start empty. Only `summary` needs styles, to keep the `hideLabels` counter visible.

```ts
root: cva({}),
summary: cva({ base: 'items-center gap-x-2 in-data-hide-labels:flex' }),
errorCount: cva({}),
currentLabel: cva({}),
segment: cva({}),
progressFill: cva({}),
currentIndicator: cva({}),
```

To get the compact layout on small screens as well, copy these slots and the `max-sm:` rules on the existing ones from [theme-rui's `Stepper.styles.ts`](https://github.com/marigold-ui/marigold/blob/main/themes/theme-rui/src/components/Stepper.styles.ts), then move the current marker's fill into `currentIndicator`. Run the typechecker afterwards. The slot record in `@marigold/system` is exhaustive, so it flags a missing slot.
