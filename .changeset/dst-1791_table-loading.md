---
'@marigold/components': minor
---

feat(DST-1791): add a `loading` prop to `<Table>`

`aria-busy` passed to a `<Table>` never reached the page. React Aria filters it
out, and nothing warned about it, so tables that tried to announce their loading
state announced nothing.

`<Table loading>` now sets `aria-busy="true"` on the grid itself and announces
the loading state through a polite live region. Nothing is announced when
loading finishes.

Replace `aria-busy` on a `<Table>`, or on a wrapper around it, with
`loading={isLoading}`.
