---
'@marigold/docs': patch
---

refactor: adopt `Sidebar.Nav` `current` prop in demos and stories

Replaces the hand-rolled `active={currentPath === '/...'}` pattern across Sidebar and AppLayout demos (documentation) and the `AppLayout` Storybook story with the new `current` prop on `Sidebar.Nav` (shipped in DST-1322 / #5306). The order-detail demo additionally leverages the new prefix-match semantics, so `/orders/:id` routes automatically highlight the `/orders` nav item without a regex fallback.

No consumer-facing package behavior changes — only demos and an internal story.
