import type { ReactNode } from 'react';

/**
 * Resolves the `textValue` a cell hands to React Aria.
 *
 * React Aria reads a cell's text off `children` when it is a plain string, and
 * both Marigold cells always hand it a render function, so that check can never
 * pass and no cell would contribute anything to its row's accessible name.
 * Resolving the value here restores the automatic path for every consumer.
 *
 * Numbers count too, where `SelectListOption` takes strings alone: a numeric row
 * header (an order number, a seat) is ordinary in a table and rare in an option
 * list.
 *
 * Scoped to the table because that is what DST-1790 covers, not because the
 * table is the only place this happens. `SelectListOption`, `ListViewItem`,
 * `Tag` and `ListBoxItem` each derive a text value of their own, and they have
 * drifted apart: `ListBoxItem` calls `String(props.children)` with no type
 * guard, so composite content there reads as the literal `[object Object]`.
 * Pulling all of them onto one helper is a separate change.
 */
export const resolveTextValue = (
  textValue: string | undefined,
  children: ReactNode
): string | undefined =>
  textValue ??
  (typeof children === 'string' || typeof children === 'number'
    ? String(children)
    : undefined);
