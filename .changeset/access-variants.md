---
'@marigold/components': minor
'@marigold/theme-rui': minor
---

feat(DST-1381): add `master`/`admin` access variants to `Link` and `MenuItem` that mark actions requiring elevated access rights with a themed glyph (lock = master, key = admin). `Badge` renders its `master`/`admin` variants through the same shared `ui-access-*` utilities.

The glyph lives entirely in the theme (CSS mask + generated content), so it works in React as well as in the generated BEM/Twig CSS, and stays visible in forced-colors mode. The glyph itself is purely decorative: on `Link` and `MenuItem` the restriction is exposed to assistive technology through a visually hidden "Master"/"Admin" text label rendered after the visible label, so restricted links and menu items carry the access level in their accessible name. `Badge` renders no extra label because its visible text already is the access level, which rules out double announcements by design.

Note that `variant` is a single axis: an access variant cannot be combined with another variant (e.g. `destructive` on `MenuItem`). For destructive actions that are access-restricted, the access variant takes precedence (`variant="master"`), with the destructive nature conveyed by the action's label and confirmation flow. See the Admin & Master Mark pattern docs.
