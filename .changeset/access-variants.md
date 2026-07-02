---
'@marigold/components': minor
'@marigold/theme-rui': minor
---

Add `master`/`admin` access variants to `Link` and `MenuItem`, and move `Badge`'s master/admin glyph to a themed CSS `::before` mask (Lock for master, Key for admin). The glyph lives entirely in the theme, so it works in React and in the generated BEM/Twig CSS. Menus group restricted items into `Master-Aktionen` / `Admin-Aktionen` sections. Accessibility (accessible name for the restriction) is intentionally deferred — see DST-1381.
