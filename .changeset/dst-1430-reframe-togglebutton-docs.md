---
'@marigold/docs': patch
---

docs(DST-1430): reframe ToggleButton as an action button, not a form field or filter

Rewrites the ToggleButton docs to position it as an action button that retains an active state, used in toolbars, editors, and canvases. The page now states explicitly that `<ToggleButton>` is not a form field or a filter, and that `<ToggleButton.Group>` is a toolbar of independent on/off actions rather than a selection control. The filter demo and the "Selection modes" section are removed; their guidance moves into a strengthened Do/Don't list and an updated Alternative components list that points readers to Checkbox.Group, Switch, Tabs, and Button. A new view-options demo broadens the group example beyond the formatting toolbar.
