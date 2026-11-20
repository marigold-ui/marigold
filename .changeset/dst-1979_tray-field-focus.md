---
'@marigold/components': patch
---

fix(DST-1979): A tray's text field takes focus only after the slide-in

`Popover.Search` in a small-screen tray now waits for the tray to slide in before it takes focus, like the search fields in ComboBox, Autocomplete and TagField. Before, it took focus while the tray was still below the screen, which could scroll the page on a phone. A control tapped during the slide-in now keeps its focus, instead of losing it to the field once the tray has slid in.
