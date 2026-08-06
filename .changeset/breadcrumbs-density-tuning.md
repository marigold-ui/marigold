---
'@marigold/theme-rui': minor
'@marigold/components': patch
---

style(DST-1586): scale breadcrumb separators with the size variant and emphasize the current page

The chevron separator now scales with the breadcrumb size (`small`/`default`/
`large`) instead of rendering at a fixed 16px, so it stays a quiet mark between
crumbs; gaps tighten on `small` accordingly. The current page reads a tier above
the trail — medium weight in the `foreground` ink — matching how the sidebar
marks the active item.

The `<Breadcrumbs>` chevrons drop their hardcoded `size={16}` prop: the theme's
`Breadcrumbs` `item` slot now owns the separator size (`[&_svg]:size-*`, which
wins over the SVG's width/height), so the number in the component was dead and
misleading. Themes that don't set a separator size fall back to the icon's
default size.
