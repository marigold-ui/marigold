---
'@marigold/theme-rui': minor
---

feat(DST-1633): `Dialog` reveals a header seam once its body scrolls.

**What changed:**

- The `Dialog` header is borderless at rest and fades in a bottom hairline once the body scrolls beneath it, matching the `Sidebar`'s scroll-revealed seam. A short (non-scrolling) dialog stays seamless.
- The scroll-seam mechanism is promoted from a private `Sidebar` utility to a reusable `ui-scroll-seam-*` primitive. It is the companion to `ui-scroll-edge` for the case where the header is a grid _sibling_ of the scrolling body rather than its ancestor. The seam color is a `--seam-color` custom property that defaults to `--color-border`.
- The `Sidebar` is migrated onto the shared primitive with its color pinned to `--color-surface-border`, so it renders exactly as before.

**Why:**

A long dialog gave no cue that its body scrolled under the header. The `Sidebar` already had this affordance, and the `Dialog` is the second occurrence of the same header-over-scrolling-body structure, so the mechanism becomes a shared primitive instead of a copy.

**Impact:**

- `Dialog` gains the affordance automatically with no API change, covering both `<Dialog.Header>` and bare `<Title>` dialogs.
- `Sidebar` is unchanged visually.
- Browsers without CSS scroll-driven animations (for example Firefox) fall back to an always-on hairline, so every engine still shows a divider.
