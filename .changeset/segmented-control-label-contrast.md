---
'@marigold/theme-rui': patch
---

Fix SegmentedControl label contrast, and make `text-secondary` flip on contrast surfaces.

Three separate 1.4.3 failures, with three different causes.

**`ui-contrast` now restates `--color-secondary`.** Applying
`text-primary-foreground` only fixes text that *inherits*; a component naming
`text-secondary` outright kept charcoal-600, measuring **3.14:1** on a contrast
ground. Restated to charcoal-500 (**4.74:1**) by the same mechanism the washes
use. Not charcoal-400, despite its more comfortable 7.49:1 — `--color-disabled`
already resolves to charcoal-400 exactly, so that choice would make a
merely-secondary label indistinguishable from a disabled one. The rung is picked
by lightness, mirroring how the token sits relative to `foreground` on light
grounds. This benefits every component beneath a contrast surface, not just this
one.

`--color-foreground` is deliberately *not* restated: `ui-soft` applies
`text-foreground`, so a soft-capped control nested in a contrast region would get
light text on a near-white cap. Components pinning `text-foreground` for emphasis
should use `text-inherit` instead.

**The ghost variant's selected label inherits its ink.** `selected:text-foreground`
named the light-ground token, so on a contrast surface it was dark-on-dark at
**1.32:1**. It now takes whatever ink the ground provides.

**The default variant's labels take `text-secondary-bold`.** Both of its labels
sit on the opaque charcoal-300 track, where plain secondary measures **3.59:1**
and fails on *every* ground — the "never `--color-secondary` on a fill" case in
DST-1590's own acceptance criteria. secondary-bold is **5.53:1** and stays
clearly dimmer than the selected label's 11.28:1. That variant keeps naming dark
ink outright rather than inheriting, because an opaque light track is what sits
beneath it regardless of ground.

Every label now clears 4.5:1 on all three grounds; the lowest is 4.74:1.

| ground | default sel / unsel | ghost sel / unsel |
| --- | --- | --- |
| surface | 17.28 / 5.53 | 14.09 / 5.50 |
| page | 17.28 / 5.53 | 12.76 / 4.97 |
| contrast | 17.28 / 5.53 | 12.54 / 4.74 |
