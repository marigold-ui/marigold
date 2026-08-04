---
'@marigold/components': major
'@marigold/theme-rui': minor
'@marigold/system': patch
---

feat(DST-1360): introduce `AppShell`, `Page`, `Page.Header`, and `Page.Content`; remove `AppLayout`

Renames `AppLayout` to `AppShell` and removes its three pass-through subcomponents (`AppLayout.Sidebar`, `AppLayout.Header`, `AppLayout.Main`) — `<Sidebar>`, `<TopNavigation>`, and `<Page>` now sit directly inside `<AppShell>` (each owns its grid area, so child order does not matter). `AppShell` absorbs `Sidebar.Provider` via the `defaultSidebarOpen` prop; render your own `<Sidebar.Provider>` around `<AppShell>` for controlled state, `variant`, or `size` and it is detected and used instead of the internal one.

Adds `<Page>` — the `<main>` landmark with page padding (`p`, or `px`/`py`; default `square-relaxed`) and vertical rhythm between sections (`space`; default `group`). The page's `<main>` is named by its `<h1>` via `aria-labelledby`; when there is no `<Title>`, pass `aria-label` (or your own `aria-labelledby`) instead. With none of these, `<Page>` warns in development so the landmark is never silently unnamed. Like `<Panel>`, `<Page>` forwards standard HTML attributes (`id`, `data-*`, event handlers) and a `ref` to its `<main>`.

Adds `<Page.Header>` — a slot-based title/description/actions header that mirrors `Panel.Header` — and an optional `<Page.Content>` (with its own `space`) for when the rhythm between sections should differ from the header-to-content gap. The page heading outline now falls out of the defaults: `<Title>` in `Page.Header` is an `h1`, `<Title>` in `Panel.Header` an `h2`, `<Title>` in `Panel.Collapsible` an `h3` (override per `<Page>` with `headingLevel`).

**Migration:**

```diff
-<Sidebar.Provider defaultOpen>
-  <AppLayout>
-    <AppLayout.Sidebar>…</AppLayout.Sidebar>
-    <AppLayout.Header>…</AppLayout.Header>
-    <AppLayout.Main>{content}</AppLayout.Main>
-  </AppLayout>
-</Sidebar.Provider>
+<AppShell defaultSidebarOpen>
+  <Sidebar>…</Sidebar>
+  <TopNavigation>…</TopNavigation>
+  <Page>
+    <Page.Header>
+      <Title>Billing</Title>
+      <Description>Manage your plan and invoices.</Description>
+      <Button variant="primary">Upgrade plan</Button>
+    </Page.Header>
+    {content}
+  </Page>
+</AppShell>
```
