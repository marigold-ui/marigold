---
'@marigold/components': major
'@marigold/system': major
'@marigold/theme-rui': major
'@marigold/cli': patch
---

feat(DST-1839): give `Stepper` a compact layout on small screens and animated step changes

On phones the stepper no longer overflows its container. Below the small-screen breakpoint it switches on its own to a "Step 2 of 4" counter, the name of the current step and a track with one segment per step, so any number of steps fits and the user always sees where they are. Finished steps stay tappable, and a step that failed earlier is flagged on the counter line as well as in red. `hideLabels` now only affects large screens, because small screens show the current step's label anyway.

Moving to another step now fills the line toward it and glides the highlight to the new step, with the same timing as the `Tabs` indicator. The motion is turned off when the user prefers reduced motion.

Nothing changes in the component API, and apps using `@marigold/theme-rui` need no code changes. Upgrade `@marigold/components` and `@marigold/theme-rui` together.

**BREAKING CHANGE:** the `Stepper` theme entry has seven new required slots.

- **Before:** `Stepper` had the slots `container`, `item`, `link`, `marker`, `label`, `connector` and `count`.
- **After:** it also has `root`, `summary`, `errorCount`, `currentLabel`, `segment`, `progressFill` and `currentIndicator`. The stepper's layout, the small-screen parts and the fill of the current marker now come from these slots. `@marigold/theme-rui` is already updated.

### Migrating a custom theme

Every theme maintained outside this repository that defines `Stepper` needs the seven new slots. After upgrading, run `marigold migrate` from the project root. It adds them with styles that keep the theme's current row on every screen size. Empty slots are not enough here, because the small-screen parts would show on large screens too.

```ts
root: cva({ base: 'flex items-center gap-3' }),
summary: cva({ base: 'hidden items-center gap-x-2 in-data-hide-labels:flex' }),
errorCount: cva({ base: 'hidden' }),
currentLabel: cva({ base: 'hidden' }),
segment: cva({ base: 'hidden' }),
progressFill: cva({}),
currentIndicator: cva({}),
```

To get the compact layout on small screens as well, copy these slots and the `max-sm:` rules on the existing ones from [theme-rui's `Stepper.styles.ts`](https://github.com/marigold-ui/marigold/blob/main/themes/theme-rui/src/components/Stepper.styles.ts), then move the current marker's fill into `currentIndicator`. Run the typechecker afterwards. The slot record in `@marigold/system` is exhaustive, so it flags a missing slot.
