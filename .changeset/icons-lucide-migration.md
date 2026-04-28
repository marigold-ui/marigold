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

The 13 retained custom icons (no Lucide equivalent) live under `src/custom/`:

- **Ticketing**: DesignTicket, GiftCard, Resale, Scanner, Stadium, TicketInsurance, Turnstile
- **Info**: PDF
- **Social**: Facebook, Google, Instagram, Twitter, TwitterX

Custom icons are built on top of Lucide's `createLucideIcon`, so they share the same API and runtime behavior as the re-exported Lucide icons: same `LucideProps` shape (`size`, `color`, `strokeWidth`, `className`, `ref`), support for `<LucideProvider>` context, and an auto `aria-hidden="true"` when no children or a11y props are supplied. The `size` prop now renders as `width="24"` (numeric) instead of `"24px"`.

Filled custom icons (everything except Instagram and Twitter, which are stroke-based outlines) are wrapped with a small `createFilledIcon` helper that defaults `fill` and `stroke` to `currentColor` and couples the `color`, `fill`, and `stroke` props so they move together. This is a slight deviation from Lucide's stock `color` → `stroke` mapping: passing `color="red"` or `fill="red"` to a filled custom icon updates both fill and stroke; pass `stroke` explicitly to differentiate them. Stroke-based outline icons (Instagram, Twitter) keep Lucide's standard `color` → `stroke` behavior.

Style icons via Tailwind utilities on `className` (e.g. `<TriangleAlert className="text-warning" />`) rather than the `color` prop. Lucide reads `color` as a literal CSS color value, so theme tokens like `"warning"` won't resolve there; icons inherit `currentColor` and pick up any `text-*` utility you apply.

The peer dependency range has been narrowed to `react: >=19.0.0` (custom icons rely on React 19's ref-as-prop).
