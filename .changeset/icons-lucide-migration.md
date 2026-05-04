---
'@marigold/icons': major
---

feat(DST-1213)!: migrate `@marigold/icons` to a `lucide-react` proxy with 13 custom icons.

**BREAKING CHANGE**: All custom icons without a Lucide equivalent remain; icons with a Lucide equivalent have been removed. Consumers should import equivalents from the re-exported `lucide-react`, available through the same package:

```tsx
// Before
import { Search, Check, Add, Ticket, Seat, Deal } from '@marigold/icons';

// After (Search, Check still work, re-exported from Lucide)
import {
  Search,
  Check,
  Plus as Add,
  Ticket,
  Armchair as Seat,
  BadgePercent as Deal,
} from '@marigold/icons';
```

## Using icons

Always import from `@marigold/icons` (not directly from `lucide-react`). The package re-exports the entire Lucide catalogue plus the 13 retained custom icons:

```tsx
import { Search, DesignTicket, Stadium } from '@marigold/icons';
```

Pass `size` and `strokeWidth` as props. `size` is now serialized as a numeric attribute (`width="24"`) instead of `"24px"`:

```tsx
<Search size={20} strokeWidth={1.5} />
```

### Coloring

Style with Tailwind text utilities — icons inherit `currentColor`, so any `text-*` color (including theme tokens) flows through:

```tsx
<TriangleAlert className="text-warning-accent" />
<DesignTicket className="text-primary-700" />
```

Avoid the `color` prop for theme tokens (Lucide reads it as a literal CSS color value, so `"warning"` won't resolve). Reserve `color`/`fill`/`stroke` for literal values like `var(--color-...)` or hex codes.

### Custom icons (filled vs. outline)

11 of the 13 customs are filled silhouettes wrapped with a small helper that defaults `fill` and `stroke` to `currentColor` and couples the `color`, `fill`, and `stroke` props so they move together. Pass `stroke` explicitly to differentiate:

```tsx
<DesignTicket fill="var(--color-destructive-accent)" />
<DesignTicket
  fill="var(--color-destructive-accent)"
  stroke="var(--color-info-accent)"
/>
```

`Instagram` and `Twitter` are stroke-based outlines and follow Lucide's standard `color` → `stroke` behavior.

### Accessibility

Icons get `aria-hidden="true"` automatically when rendered without children or an `aria-*` attribute. Provide `aria-label` for standalone meaningful icons.

## Other changes

- Custom icons share `LucideProps`, `<LucideProvider>` context, and ref forwarding with the re-exports.
- Peer dependency narrowed to `react: >=19.0.0` (custom icons rely on React 19's ref-as-prop).
