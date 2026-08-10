---
'@marigold/docs': patch
---

feat(DST-1692): add consent banner, Impressum and privacy notice to the docs site.

**What changed:**

- New `/impressum` and `/datenschutz` routes. Both carry a German (authoritative) and an English version, each wrapped in a `lang`-scoped `<section>` so screen readers switch voice (WCAG 2.1 AA 3.1.2); the English translation nests one heading level below the German so each page keeps a single `<h1>`.
- The prose lives in `legal/*.mdx`, rendered by those routes. It sits outside `content/` on purpose: the docs collection globs all of `content`, so anything there would join the page tree, sidebar, search and MCP index.
- A consent banner gates Vercel Web Analytics. Nothing is loaded until consent is granted, the choice is stored in `localStorage`, and the footer's "Cookie settings" link reopens the banner — with focus management, Escape and a close button.
- `SiteFooter` is wired into the docs, home, legal **and** `/examples/*` layouts, so the legal links are reachable from every public route.

**Why:**

§ 5 DDG and Art. 13 GDPR apply to the site, and analytics needs an opt-in that can be withdrawn as easily as it is given.

**Impact:**

- The banner only appears on the production deployment, or wherever `NEXT_PUBLIC_CONSENT_BANNER=1` is set — including a preview, so Legal and the DPO can review it as it ships.
- Both legal pages are **drafts** pending Legal / DPO review and release.
