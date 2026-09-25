---
'@marigold/components': patch
'@marigold/theme-rui': patch
'@marigold/docs': patch
---

refactor(DST-1752): draw the checkbox and radio box edge from one token

The thin edge around a checkbox, a radio and the selection mark of a list row is
the only thing announcing the control before you click it, and it was written
four times: twice in the theme, once inline in `Checkbox.tsx`, and once in the
shared grid indicator. The indicator reached for `--color-border`, the divider
token, so a single-select `SelectList` option and a `ListView` row drew their
mark about 1.6 times fainter than the checkbox beside it.

There are now three tokens, all derived from `--color-control-border` so they
track any change to it: `--color-control-edge` at +0.06 alpha for the resting
edge, `--color-control-edge-hover` at +0.18, and
`--color-control-edge-disabled` at -0.06. Three files read them: the `Checkbox`
and `Radio` theme slots, and the shared grid indicator. The fourth copy, the one
inline in `Checkbox.tsx`, is deleted rather than repointed, because it never
shipped: the theme slot's edge already beat it in the merged class list. A
resting checkbox therefore looks exactly as it did.

The disabled step is a token rather than a palette rung because a disabled mark
has three grounds to survive, and both of the opaque values this family reached
for before vanish on one of them:

| Disabled edge | on `surface` | on the page ground | on a `selected` row |
| --- | --- | --- | --- |
| `disabled-surface` (charcoal-100) | 1.11:1 | **1.00:1** | 1.38:1 |
| `disabled-border` (charcoal-300) | 1.53:1 | 1.38:1 | **1.00:1** |
| `control-edge-disabled` (-0.06) | 1.57:1 | 1.57:1 | 1.54:1 |

`disabled-border` is the same palette step as `selected`, so on a picked row an
opaque edge is not dim but gone. The translucent step holds 1.54:1 to 1.57:1
everywhere, which is the weight `disabled-border` was chosen for in the first
place. `--color-disabled-border` itself is unchanged and still the rung the
`ui-control` family uses.

Three visible fixes come with it. The selection mark now dims whenever its row
is disabled, instead of waiting for the row to also be selected, so a disabled
unselected row no longer keeps an edge that reads as live. The disabled edge
across the whole family holds its weight on every ground rather than on white
alone. And a disabled control that is checked now shows what it is set to: the
check glyph and the radio dot are drawn in `currentColor`, `group-selected`
sorts after `group-disabled`, so the unforced `text-disabled` lost the cascade
and the mark painted `selected-bold-foreground` on `disabled-surface` at 1.06:1.

The selection mark deliberately has no hover step. Inside a row the row is the
click target and already carries its own hover, so a second hover on a
decorative mark would answer a gesture nobody made.

The mark stays a hand-drawn `div` rather than a real `Radio`. React Aria hands
a grid row a `CheckboxContext` under `slot="selection"`, which is what the
multi-select branch renders, but there is no radio equivalent: a real `Radio`
wants a radio group's state and would put a second focusable input inside a row
that already owns its own selection.

A disabled checkbox also dims its box when it is indeterminate, not only when
it is checked. Indeterminate never sets `data-selected`, so it needed its own
fill rule, and without it the newly forced `text-disabled` ink landed on a box
still painted the live `selected-bold`.

No API changes. Expect visual diffs on single-select `SelectList` and `ListView`
rows, and on disabled checkboxes and radios, including every disabled checked
one and every disabled indeterminate one.
