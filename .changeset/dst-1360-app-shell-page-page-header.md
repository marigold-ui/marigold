---
'@marigold/components': major
'@marigold/theme-rui': minor
'@marigold/system': patch
---

feat(DST-1360): introduce `AppShell`, `Page`, and `Page.Header`; remove `AppLayout`

Renames `AppLayout` to `AppShell` and removes its three pass-through subcomponents (`AppLayout.Sidebar`, `AppLayout.Header`, `AppLayout.Main`) — `<Sidebar>`, `<TopNavigation>`, and `<Page>` now sit directly inside `<AppShell>` (each owns its grid area). `AppShell` absorbs `Sidebar.Provider` via the `defaultSidebarOpen` prop; render your own `<Sidebar.Provider>` around `<AppShell>` for controlled state, `variant`, or `size`.

Adds `<Page>` — the `<main>` landmark with page padding (`square-relaxed`) and vertical rhythm (`group`), labelled by its `<h1>` — plus `<Page.Header>` (a slot-based title/description/actions header that mirrors `Panel.Header`) and an optional `<Page.Content>` for when the rhythm between sections should differ from the header-to-content gap. The page heading outline now falls out of the defaults: `<Title>` in `Page.Header` is an `h1`, `<Title>` in `Panel.Header` an `h2`, `<Title>` in `Panel.Collapsible` an `h3`.

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
+    </Page.Header>
+    {content}
+  </Page>
+</AppShell>
```
