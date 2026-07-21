---
'@marigold/components': patch
'@marigold/theme-rui': patch
'@marigold/system': minor
---

fix(DST-1630): match the Panel collapsible header caret to the Accordion chevron. It rendered at the default 24px in the foreground color, while Accordion uses a 16px `text-secondary` caret, so the two collapsible patterns looked inconsistent. The Panel caret now renders at 16px and its color is driven by a new themeable `collapsibleIcon` slot (defaulting to `text-secondary` in the RUI theme).
