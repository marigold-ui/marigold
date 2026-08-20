---
'@marigold/system': patch
'@marigold/components': patch
'@marigold/theme-rui': patch
---

fix(DST-1675): treat `collapsed` as axis-less when resolving inset padding

`resolveInsetAxes` appended an axis suffix to every non-numeric inset token, including `collapsed` — the one token where an axis split is meaningless, since it means "no spacing" on both axes. So `<Panel p="collapsed">` resolved to `var(--spacing-collapsed-x)` rather than `var(--spacing-collapsed)`.

That variable went undeclared until it was added to `@marigold/theme-rui`, so the declaration was invalid at computed-value time and `padding` fell back to its initial value of `0` — the right answer for the wrong reason. The cost was that every theme implementing this API had to ship three variables that all mean `0` (`--spacing-collapsed`, `-x`, `-y`) to make one documented prop value work, with nothing to tell it so.

`collapsed` is now recognised as axis-less and passed through unsuffixed, so a theme declares `--spacing-collapsed` only. The same guard is applied to the deliberately-divergent copy of the axis logic in `SelectList`, which had the identical bug on its `p` prop. A new `isAxislessToken` predicate is exported from `@marigold/system` so the concept has one home instead of being inlined at both call sites.

`isScale` is unchanged: `collapsed` stays non-numeric there, because `createWidthVar`, `createHeightVar` and `createSpacingVar` depend on that classification.

**Theme:** `--spacing-collapsed-x` and `--spacing-collapsed-y` are removed from `@marigold/theme-rui`. They existed only to satisfy the suffix that is no longer generated, and nothing else referenced them.
