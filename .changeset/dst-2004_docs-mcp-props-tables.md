---
'@marigold/docs': patch
---

fix(DST-2004): the docs search used by the `marigold-docs` MCP includes props tables again

The release job now builds the props tables before it rebuilds the search index, so a search for a component returns its props. Long props tables are split by rows into several search entries, each with the table header.
