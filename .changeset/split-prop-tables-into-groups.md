---
'@marigold/docs': patch
---

feat([DST-1388]): split prop tables into main, aria and handler groups

The interactive Props table (`<AutoTypeTable>`) on each component page now shows the meaningful API props by default and tucks `aria-*` / `role` attributes and React DOM event handlers into separate collapsible sections (e.g. Button drops from 112 visible props to 39 main + 10 aria + 63 handlers). The static markdown pipeline that feeds the LLM/MCP `search_docs` index is intentionally untouched, so machine-readable docs continue to expose the full prop list.

[DST-1388](https://reservix.atlassian.net/browse/DST-1388)
