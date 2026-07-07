---
'@marigold/theme-rui': minor
---

style(Breadcrumbs): scale separators with the size variant and emphasize the current page

The chevron separator now scales with the breadcrumb size (`small`/`default`/
`large`) instead of rendering at a fixed 16px, so it stays a quiet mark between
crumbs; gaps tighten on `small` accordingly. The current page reads a tier above
the trail — medium weight in the `foreground` ink — matching how the sidebar
marks the active item.
