---
'@marigold/components': minor
'@marigold/docs': patch
---

feat(DST-1491): `<AppShell>` renders a skip-link to the page content

`<AppShell>` now renders a localized "Skip to main content" link as its first focusable element. It stays visually hidden until it receives focus, and activating it moves focus to the `<main>` landmark of the `<Page>`, so keyboard and screen-reader users can bypass the sidebar and top navigation (WCAG 2.4.1). No setup is needed. The landmark is focusable (`tabindex="-1"`) only while the link has moved focus there, so pages keep their current click behavior.
