---
'@marigold/components': minor
'@marigold/theme-rui': minor
---

Add `master`/`admin` access variants to `Link` and `MenuItem` that mark actions requiring elevated access rights with a themed glyph (lock = master, key = admin). `Badge` renders its `master`/`admin` variants through the same shared `ui-access-*` utilities.

The glyph lives entirely in the theme (CSS mask + generated content), so it works in React as well as in the generated BEM/Twig CSS. The restriction is exposed to assistive technology via CSS alternative text (`content: '' / 'Master'`), giving restricted links, menu items, and badges an accessible name prefix.

Note that `variant` is a single axis: an access variant cannot be combined with another variant (e.g. `destructive` on `MenuItem`). For destructive actions that are access-restricted, the access variant takes precedence (`variant="master"`), with the destructive nature conveyed by the action's label and confirmation flow — see the Admin & Master Mark pattern docs.
