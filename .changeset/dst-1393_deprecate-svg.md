---
'@marigold/system': minor
'@marigold/components': patch
'@marigold/docs': patch
---

refactor(DST-1393): deprecate `<SVG>` from `@marigold/system`

`<SVG>` dates from before the move to `@marigold/icons`, where it was the base for icons. Icons now come from `@marigold/icons`, and for any other inline graphic a native `<svg>` with Tailwind classes does the same job without the extra component.

**Current:** `<SVG>` and `SVGProps` are exported from `@marigold/system` and documented under Components > Content > SVG.

**New:** both are marked `@deprecated` and will be removed in the next major. In development, the first `<SVG>` that renders logs a single `console.warn`. Production builds log nothing. The SVG docs page is gone, and the Iconography page explains how to replace it.

To migrate, use the matching icon from `@marigold/icons`. For other graphics, switch to a native `<svg>`: `size={32}` becomes `className="size-8"`, `color="info-accent"` becomes `className="text-info-accent"`, and add `fill-current` where you relied on the default fill.

```tsx
// Before
<SVG size={32} color="info-accent" viewBox="0 0 24 24">
  <path d="…" />
</SVG>

// After
<svg className="text-info-accent size-8 fill-current" viewBox="0 0 24 24">
  <path d="…" />
</svg>
```

`ProgressCircle` and the sort icons in `Table` no longer use `<SVG>` internally. They render the same markup as before, so nothing changes in your app, and they do not trigger the warning.
