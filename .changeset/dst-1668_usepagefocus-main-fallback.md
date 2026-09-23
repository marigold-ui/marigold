---
'@marigold/components': minor
---

feat(DST-1668): `usePageFocus` falls back to the `<main>` landmark when a page has no `<h1>`

`usePageFocus` was a deliberate no-op on a page with no `<h1>`, which is an `aria-label`-only `<Page>`. That is a supported, documented pattern, so a whole class of pages got no route-change focus management at all. In a real app focus was then left on whatever the user had just clicked, usually a link inside the screen that was unmounting. The browser drops focus to `<body>` at that point and the keyboard user lands back at the top of the document, which is the exact problem the hook exists to solve.

**The `<main>` landmark is now the fallback target.** When the heading lookup finds nothing, focus moves to the page's `<main>` instead. `<Page>` now defaults that landmark to `tabIndex={-1}`, the same pattern `SidebarRail` uses for its panel title and the one a skip link needs, so it is focusable without ever entering the tab order. It is a default rather than a fixed value, so a `tabIndex` you pass to `<Page>` yourself still wins and nothing that worked before changes. `<Page>` always renders a `<main>`, and an `aria-label`-only page always names it, so the announcement is meaningful rather than a bare "main".

**The titled path keeps its target.** When the `<h1>` resolves it is still the focus target, and the first render is still skipped so the initial load never steals focus.

**The focus move is deliberately invisible.** Both targets carry `outline-none`, so neither draws a ring when the hook focuses them, which keeps a route change from outlining the whole content area. `focus-visible` cannot do this job: after a keyboard-initiated navigation the link the user activated matched it, so a programmatically focused target matches it too. Both classes sit in the component, beside the focus they hide. The heading gets it from the title slot config that `<Page>` and `<Page.Header>` publish to their heading contexts, so a bare `<Title>` and one inside the header behave the same, and no theme bump has to travel with this one for the ring to stay away. A titled page no longer flashes a ring on a keyboard-initiated navigation.

**Overriding `tabIndex` gives the ring back.** The suppression is tied to the default: pass `<Page tabIndex={0}>` and the landmark becomes a real tab stop, so it takes the standard `focus-visible` ring instead. A focusable element a keyboard user can land on is never left without a focus indicator.

**The focusable `<main>` has one visible consequence.** Clicking text or any other non-interactive part of the page now moves focus to the landmark, so a screen reader announces the page and the next `Tab` continues from the top of the page content rather than from the top of the document. That is the trade-off any `tabindex="-1"` skip-link target makes, and the Page docs call it out.

**One documented caveat changes meaning.** A route whose `<Title>` sits behind a `React.lazy` boundary can still be loading when the effect fires. That used to mean focus never moved. It now means focus lands on the `<main>` instead, which announces the screen when the page also carries an `aria-label` and announces as an unlabelled "main" when the missing `<Title>` was its only name. Hoisting the title above the Suspense boundary is still the fix.

`<Page>` merges the ref it forwards to `<main>` with an internal one, so a consumer-supplied `ref` keeps working exactly as before.
