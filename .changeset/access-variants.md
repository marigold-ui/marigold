---
'@marigold/components': minor
'@marigold/theme-rui': minor
---

feat(DST-1381): add `master`/`admin` access variants to `Link` and `MenuItem` that mark actions requiring elevated access rights with an icon (lock = master, key = admin). `Badge` renders its `master`/`admin` variants with the same icons.

The components render the icon as a decorative `<svg>` colored by the theme's access foreground tokens (which also keeps it visible in forced-colors mode). On `Link` and `MenuItem` the restriction is exposed to assistive technology through a visually hidden "Master"/"Admin" text label rendered after the visible label, so restricted links and menu items carry the access level in their accessible name. `Badge` renders no extra label because its visible text already is the access level, which rules out double announcements by design.

Note that `variant` is a single axis: an access variant cannot be combined with another variant (e.g. `destructive` on `MenuItem`). For destructive actions that are access-restricted, the access variant takes precedence (`variant="master"`), with the destructive nature conveyed by the action's label and confirmation flow. See the Admin & Master Mark pattern docs.
