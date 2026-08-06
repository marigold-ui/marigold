---
'@marigold/components': patch
---

fix(DST-1679): stop `SelectList` from advertising two props it silently ignores, and stop `SelectList.Option` from double-warning about a missing `textValue`.

**What changed:**

- `layout` and `keyboardNavigationBehavior` are no longer part of `SelectListProps`. Both were publicly typed but discarded at runtime: the list hardcodes `layout="grid"` after spreading consumer props, and RAC derives `keyboardNavigationBehavior: 'tab'` from that grid layout. They now sit in `RemoveProps` alongside `selectionMode`, which is the correct pairing for a prop the component owns.
- `SelectList.Option` no longer warns about a missing `textValue`. RAC's `GridList` already warns on exactly that condition and its warning can't be suppressed, so one authoring mistake produced two console lines. The `textValue` fallback for plain-string children is unchanged.

**Why:**

`layout` was a prop that lied — the docs props table even published it as `"stack" | "grid"` defaulting to `'stack'` while the component always rendered a grid. Passing it type-checked and did nothing, and it couldn't be removed later without a breaking change.

The duplicate warning was also a false positive in one case: RAC accepts an `aria-label` in place of a `textValue`, so an option named that way is perfectly accessible, but the local warning fired on it anyway while RAC stayed silent.

**Impact:**

No runtime behavior change. `layout` and `keyboardNavigationBehavior` were already no-ops, so code passing them keeps working identically — it just no longer type-checks, which is the point. `layout="grid"` stays hardcoded because it is load-bearing: it gives the list arrow-key navigation on both axes, so a horizontal list moves with Left/Right and still moves with Up/Down after the container-query flip to a vertical stack. Under RAC's `"stack"` default a row captures Left/Right to walk its own focusable children and horizontal navigation stops working; a new test now guards that.
