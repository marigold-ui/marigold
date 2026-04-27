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

The 12 retained custom icons (no Lucide equivalent) live under `src/custom/`:

- **Ticketing**: DesignTicket, GiftCard, Resale, Scanner, Stadium, TicketInsurance, Turnstile
- **Info**: PDF
- **Social**: Facebook, Google, Instagram, Twitter

They now accept `LucideProps` (`size`, `color`, `strokeWidth`, `className`, `ref`) instead of the previous `SVGProps`. The `size` prop now renders as `width="24"` (numeric) instead of `"24px"`.

Style icons via Tailwind utilities on `className` (e.g. `<TriangleAlert className="text-warning" />`) rather than the `color` prop. Lucide reads `color` as a literal CSS color value, so theme tokens like `"warning"` won't resolve there; icons inherit `currentColor` and pick up any `text-*` utility you apply.

The peer dependency range has been narrowed to `react: >=19.0.0` (custom icons rely on React 19's ref-as-prop).
