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
 */
export const resolveTextValue = (
  textValue: string | undefined,
  children: ReactNode
): string | undefined =>
  textValue ??
  (typeof children === 'string' || typeof children === 'number'
    ? String(children)
    : undefined);
