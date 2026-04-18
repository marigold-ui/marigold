---
'@marigold/components': minor
'@marigold/theme-rui': minor
'@marigold/system': minor
---

feat(DST-1326): introduce `Panel.CollapsibleHeader`, `Panel.CollapsibleTitle`, and `Panel.CollapsibleDescription`, replacing `Panel.CollapsibleTrigger`. The collapsible now mirrors `Panel.Header` — a header wrapper with a title plus an optional description — and the whole visual surface is a single click target: title and description render as spans inside the trigger `<button>`, with the accessible name wired via `aria-labelledby` and the description via `aria-describedby`. The chevron icon was replaced with a new reusable `MorphCaret` that animates via SVG path morphing (honours `prefers-reduced-motion`).

**Breaking**: `Panel.CollapsibleTrigger` is removed. Migrate with:

```diff
  <Panel.Collapsible>
-   <Panel.CollapsibleTrigger>Advanced Options</Panel.CollapsibleTrigger>
+   <Panel.CollapsibleHeader>
+     <Panel.CollapsibleTitle>Advanced Options</Panel.CollapsibleTitle>
+   </Panel.CollapsibleHeader>
    <Panel.CollapsibleContent>…</Panel.CollapsibleContent>
  </Panel.Collapsible>
```
