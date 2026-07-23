---
'@marigold/cli': minor
---

feat(DST-1543): add `marigold migrate <version>` codemods for breaking Marigold releases. The v18 migration restructures theme files to the new slot shapes (never overriding consumer classes), swaps exact-baseline layout classes with a token diff report, scaffolds missing theme components, applies safe application-code renames (icon imports per the official mapping, `Tabs.TabPanel`/`SelectList.Item`, `Inset` spacing props, `TextField` min/max), and reports everything that needs a human decision with pinned source links. Run `npx marigold migrate v18 --dry-run` first.
