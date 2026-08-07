---
'@marigold/components': patch
---

docs(DST-1427): promote `EmptyState` from beta to stable

`EmptyState` has been in beta since January. v18 is where its surface settled, with the title becoming a semantic heading behind a configurable `headingLevel` and the description moving onto the shared `Description` primitive, so the badge comes off now that the API being frozen is the one 18.0.0 ships. `title`, `description`, `action` and `headingLevel` are covered by the usual semver guarantees from here on. `variant` and `size` stay open ended, as they do on every themed component: `theme-rui` defines no values for either today, and anything it adds later widens the accepted set rather than narrowing it. No code changes.
