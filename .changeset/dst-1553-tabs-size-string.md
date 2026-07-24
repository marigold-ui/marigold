---
'@marigold/components': patch
---

fix(DST-1553): drop the dead `'small' | 'medium' | 'large'` literals from `Tabs` `size`

The `size` and `variant` props on `Tabs` resolved to nothing after the RUI theme
size variants were removed (2025-03-04). `size` now accepts a plain `string`
(matching `Label` and `HelpText`) instead of advertising specific values that no
theme backs. The props stay in place as theme hooks, so a consumer theme can
define its own `size`/`variant` variants without the misleading built-in union.
