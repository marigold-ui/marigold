import type { ReactNode } from 'react';
import { BadgeContext } from '../Badge/Context';

/**
 * The `badge` slot of `Checkbox`, `Radio` and `Switch`. Boxes the decoration
 * to `1lh` and centres it, so it can't inflate the label's first line and
 * push the control off centre (DST-1607); an oversized decoration overflows
 * symmetrically instead. Also gives a nested `<Badge>` `size="inline"` via
 * context, unless it sets its own `size`.
 *
 * `align-top` (not `middle`) matters only for `Radio`, whose label stays a
 * plain text block so children like `<Inline alignX="between">` keep filling
 * its width. `middle` aligns to half the font's x-height, not the line's
 * centre, and was inflating the line ~1px. `Checkbox`/`Switch` lay the label
 * out as a flex row, where `vertical-align` is inert.
 */
export const LabelAdornment = ({ children }: { children?: ReactNode }) => (
  <span className="inline-flex h-[1lh] shrink-0 items-center align-top">
    <BadgeContext value={{ size: 'inline' }}>{children}</BadgeContext>
  </span>
);
