---
'@marigold/system': major
'@marigold/components': patch
'@marigold/docs': patch
'@marigold/cli': minor
---

refactor(DST-1393): remove `<SVG>` from `@marigold/system`

`<SVG>` dates from before the move to `@marigold/icons`, where it was the base for icons. Icons now come from `@marigold/icons`, and for any other inline graphic a native `<svg>` with Tailwind classes does the same job without the extra component.

**Before:** `<SVG>` and `SVGProps` are exported from `@marigold/system` and documented under Components > Content > SVG.

**After:** both are gone. The SVG docs page redirects to the Iconography page, which explains how to replace it.

### Migration

An app that still imports `<SVG>` fails to build after the upgrade. Use the matching icon from `@marigold/icons`, or a native `<svg>`. `<SVG>` always added `flex-none fill-current` and rendered at 24px unless you passed `size`, so carry those over:

- `size={32}` becomes `className="size-8"`. Without `size`, add `size-6`.
- `color="info-accent"` becomes `className="text-info-accent"`.
- Add `flex-none`, so the graphic does not shrink in a flex row, and `fill-current` where you relied on the default fill.

```tsx
// Before
<SVG size={32} color="info-accent" viewBox="0 0 24 24">
  <path d="…" />
</SVG>

// After
<svg className="text-info-accent size-8 flex-none fill-current" viewBox="0 0 24 24">
  <path d="…" />
</svg>
```

`marigold migrate v19` makes this change for you. It turns `size` into `width` and `height`, so a size class you already set still wins, and `color` into a `text-*` class. It reports what it cannot rewrite safely: spread props that may carry `size` or `color`, a `color` or `className` that is not a string literal, `SVGProps`, re-exports such as `export * from '@marigold/system'`, and `SVG` used as a value.

`ProgressCircle` and the sort icons in `Table` no longer use `<SVG>` internally.
