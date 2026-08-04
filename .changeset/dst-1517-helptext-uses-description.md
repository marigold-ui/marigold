---
'@marigold/components': patch
---

chore(DST-1517): HelpText renders the shared Description component

`HelpText` now renders the description through the shared `Description` component
instead of react-aria's raw `<Text slot="description">`. `Description` is just
`<Text slot="description">`, so the rendered output and `aria-describedby` wiring
are unchanged. The win is a single `Description` building block shared by both the
slot-configuration containers and the form fields, so the two cannot drift apart.
No names, output, or behaviour change.
