---
'@marigold/components': patch
---

fix(DST-1507): make `Table.EditableCell` inline editing work after SSR hydration

In a server-rendered app (for example Next.js), editable cells were inert after hydration. Clicking a cell did not open its inline editor until an unrelated re-render, such as a window resize, happened to occur. React Aria builds the table collection in a separate render pass, and the editing state previously lived in that build pass, so the rendered cell content stayed bound to the server pass and never reconnected to the live component after hydration. The editing state and overlay now live in an inner component rendered inside the `Cell`, so interaction reconnects on its own after hydration.
