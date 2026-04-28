---
'@marigold/components': patch
---

`Panel.Title` may now be used as a direct child of `Panel` when the Panel has only a title (no description, no actions) — `Panel.Header` is the layout wrapper for title + description + actions, but a title-only Panel doesn't need it. Accessibility (`aria-labelledby`) and horizontal panel padding still resolve correctly. `Panel.Description` and `Panel.HeaderActions` continue to require a `Panel.Header` wrapper. No change to existing usages.
