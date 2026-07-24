---
'@marigold/components': major
'@marigold/docs': major
---

refa([DST-1549]): **Breaking change**: Rename compound member `Tabs.TabPanel` → `Tabs.Panel`

`Tabs` now exposes `.List`, `.Item`, and `.Panel`, so every compound member follows
one predictable naming rule. `<Tabs.TabPanel>` is removed (hard rename, no deprecated alias).

**Migration:**

| Before                     | After                  |
| -------------------------- | ---------------------- |
| `<Tabs.TabPanel id="…">`   | `<Tabs.Panel id="…">`  |
