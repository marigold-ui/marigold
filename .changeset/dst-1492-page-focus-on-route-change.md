---
'@marigold/components': minor
---

feat(DST-1492): add `usePageFocus` to move focus to the page `<h1>` on route change

On client-side navigation focus lingers on the clicked link or falls back to `<body>`, so screen-reader and keyboard users get no signal that the screen changed. `usePageFocus` implements the standard SPA fix: given the current route key (typically the pathname), it makes the page `<h1>` programmatically focusable (`tabIndex={-1}`) and focuses it on each change.

The first render is skipped so the initial load never steals focus, and it is a no-op on a page with no `<h1>` (an `aria-label`-only `<Page>`). `<Page>` stays router-agnostic — the route signal comes from the app router (`RouterProvider`). Call the hook from a component that persists across navigations (the layout / shell level), since the skip-first-render guard is per mount.

```tsx
import { Page, usePageFocus } from '@marigold/components';

const PageFocus = ({ pathname }: { pathname: string }) => {
  usePageFocus(pathname);
  return null;
};

<Page>
  <PageFocus pathname={location.pathname} />
  <Page.Header>
    <Title>Billing</Title>
  </Page.Header>
  {/* … */}
</Page>;
```
