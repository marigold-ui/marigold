---
id: ADR-0002
status: proposed # proposed | accepted | superseded-by ADR-NNNN
date: 2026-08-17
applies_to:
  - 'packages/components/src/AppShell/**'
  - 'packages/components/src/Page/**'
  - 'packages/components/src/Sidebar/**'
  - 'packages/components/src/TopNavigation/**'
---

# 0002. Name the application container for its structure (`AppShell`), and keep "chrome" for the role

## Context

Two words were in play for the thing that wraps an application: **frame** and **chrome**. They were used loosely enough that the same sentence could mean either the outer container or the furniture inside it, and the component itself changed name in v18.

The code settled both, in different directions.

**"Frame" describes the outer container.** `AppShell`'s own doc comment calls it "the CSS Grid frame for an application", and `MIGRATION-v18.md` opens the app-structure section with "**The frame: `<AppShell>`.** `<AppShell>` is the outer frame of an application, a persistent navigation rail plus the page area." A frame is structural and singular: one per application, defining named regions and nothing else.

```
[grid-template-areas:'sidebar_header'_'sidebar_main']
[&:has([data-rail])]:[grid-template-areas:'header_header'_'sidebar_main']
```

That is the entire component. It owns regions, not content.

**"Chrome" describes a role, at every scale.** The word appears throughout the codebase for the non-content furniture around something — and never for a component:

- `noSlot.ts` — "a `<Headline>` inside `Panel.Content` is page chrome, not the […]"
- `DrawerHeader.tsx` / `Dialog.tsx` — "the chrome (padding) lives on this container"
- `PageHeader.tsx` — `Panel.Header` is "low-emphasis ghost chrome"
- The v18.0 release notes — `AppShell` composes the navigation primitives "into a complete page chrome"

So chrome is relative to whatever content you are looking at. A dialog has chrome; a page has chrome; an application has chrome. It is never a thing you can import.

**The component was renamed.** v18 replaced `<AppLayout>` with `<AppShell>` and removed its pass-through parts (`AppLayout.Sidebar`, `.Header`, `.Main`) in favour of `<Sidebar>`, `<TopNavigation>` and `<Page>` sitting directly inside, each owning its grid area.

> **Reconstructed.** The naming discussion happened outside the repo. What is recorded here is what the code, `MIGRATION-v18.md` (A3.1 and section 5) and the v18 release notes support. The _outcome_ is well evidenced; the arguments in "Alternatives rejected" are reconstructed from what the change did, not transcribed from the debate.

## Decision

**`AppShell` is the frame.** One per application. It owns named grid areas and the sidebar provider, and nothing else. If something is being added to `AppShell` that is not a region or provider wiring, it belongs in a child.

**"Chrome" stays a role, never a component name.** Use it in prose and comments for the furniture around content — header padding, navigation, low-emphasis actions. Do not name a component `*Chrome`; the word is relative to a content boundary, so as a name it would only ever be ambiguous.

**Do not name a container for its layout technique.** `AppShell` says what it is in the application; `AppLayout` said only that it lays things out — which every layout component does.

**Regions are children that claim an area, not compound parts of the frame.** `<Sidebar>`, `<TopNavigation>` and `<Page>` are separate components placed directly inside. Source order does not matter. See [ADR-0005](0005-css-layout-over-children-manipulation.md).

## Alternatives rejected

**Keep `AppLayout`.** The incumbent, and renaming cost every consumer a manual migration step. Rejected because the name did not distinguish it from any other layout component in the system (`Aside`, `Stack`, `Columns` all lay out), while the thing itself is singular and structural — an application has exactly one. "Shell" carries that; "Layout" does not.

**Keep the pass-through parts** (`AppLayout.Sidebar`, `.Header`, `.Main`). Discoverable — the API told you what regions existed. Rejected because they implied the frame owned those regions when in fact each child owns its own grid area, so the parts were empty wrappers whose only real job was to look like structure. Removing them made child order genuinely irrelevant instead of apparently significant.

**Call it `AppChrome`.** Rejected on the grounds above: chrome is relative to a content boundary, so the name would invite exactly the confusion this record resolves. It would also be wrong on the merits — the frame contains the page area, which is content, not chrome.

**Leave both words undefined and let context disambiguate.** What was happening already. Rejected because the two words were being used for the same referent in adjacent sentences, which is the specific confusion that costs a reader time on every encounter. Both now have entries in [CONTEXT.md](../CONTEXT.md).

## Consequences

**What this buys.** One word per concept. "Frame" points at a component you can open; "chrome" points at a role you can recognise at any scale. A reviewer can say "that is chrome" without being asked which component is meant.

**What it costs.**

- **A rename that consumers pay for.** `AppLayout` → `AppShell` is a manual migration step, documented in `MIGRATION-v18.md` A3.1. The cost is already spent, but it is the reason to get the next such name right the first time.
- **"Chrome" stays informal.** Nothing enforces the distinction and nothing can — it is a prose convention. It will drift in comments before it drifts in code.
- **`AppShell` is deliberately thin**, which reads as under-featured. Requests to add header behaviour or scroll handling to it will recur; the answer is a child component, and this record is why.
- The reasoning above is **reconstructed from artefacts, not transcribed from the decision**. If someone who was in that discussion contradicts it, they are right and this record should be superseded.
