---
'@marigold/components': minor
---

fix(DST-1573): default `<Page>` and `<Page.Content>` spacing to `regular`

The `space` prop on `<Page>` and `<Page.Content>` — which controls the vertical rhythm between a page's children (the `<Page.Header>` and the `<Panel>`s/sections below it) — now defaults to `regular` (`spacing(6)`, 24px) instead of `group` (`spacing(12)`, 48px). The previous default produced too much whitespace between sections. Consumers can opt back into the larger gap with `space="group"`.
