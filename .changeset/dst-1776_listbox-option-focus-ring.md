---
'@marigold/components': patch
'@marigold/theme-rui': patch
---

fix(DST-1776): keep the ListBox option focus ring inside the list

A focused option in a `ListBox` drew its keyboard focus ring with
`ui-state-focus`, an outset `outline-3` halo. Options sit 1px off the list's
edge, and in a `Popover` the list is clipped to an 8px corner radius, so the
halo landed under the popover rim: cut flat along the left edge and truncated at
the corners. In a `ComboBox` that clipped band sits a few pixels below the
field, close enough to read as the input's own ring fallen out of alignment,
which is how it was originally reported.

The ring is now `ui-state-focus-item`, the inset variant, matching `Menu`. An
inset ring cannot leave the option's own box, so nothing clips it. It also
carries the full-opacity `--color-ring` instead of the `/50` the outset halo
used, which is what a focus indicator needs to clear the 3:1 contrast floor on a
borderless row.

Options also gain `focus:bg-focus-highlight`, the roving-cursor wash that
`ui-state-focus-item` is documented to pair with rather than replace, and which
`Menu` already had. A focused option now carries the focus-highlight fill, and a
focused option that is also selected keeps the stronger selected fill, so
selection stays visible under the cursor. Measured against the ring, that is
4.97:1 over focus-highlight and 3.59:1 over selected, both clear of the 3:1 a
focus indicator needs.

This affects every list built on the shared `ListBox` item slot: `ComboBox`,
`Select`, `Autocomplete` and a standalone `ListBox`. `Menu`, `SelectList` and
`ListView` already drew an inset ring and are unchanged.

The slot has a fifth consumer that is not a list option: `CalendarPresets` puts
it on the button that opens the presets dialog. On an option the wash tracks a
cursor that moves on, but on that button a fill left behind by a mouse click
reads as "selected", so the button opts out of the wash at the call site and
keeps the focus appearance it had.

`ListBoxItem` also drops `focus-visible:z-1`. It existed only to lift an outset
ring above neighbouring options, and an inset ring cannot overlap one.

No API change.
