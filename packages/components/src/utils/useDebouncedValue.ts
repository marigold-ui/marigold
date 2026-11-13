import { useEffect, useState } from 'react';

// Debounced value
// ---------------
// Follows `value` once it has stopped changing for `delay` ms, for work that
// should wait until people pause, like a server search while they type.
// `skipDelay` takes a change over right away instead, for example a cleared
// query. Returns the settled value and whether a newer one is still waiting.
//
// Changes are compared by identity, so memoize object values. Otherwise every
// render counts as a change and restarts the delay.
export interface DebounceOptions<T> {
  /** How long the value must stay the same before it settles, in ms. */
  delay: number;
  /** Whether a change settles right away, without the delay. */
  skipDelay?: (settled: T, next: T) => boolean;
}

export const useDebouncedValue = <T>(
  value: T,
  { delay, skipDelay }: DebounceOptions<T>
): [settled: T, waiting: boolean] => {
  const [settled, setSettled] = useState(value);
  const changed = !Object.is(settled, value);

  // Set while rendering, not in an effect, so a skipped delay doesn't show
  // the old value for a frame.
  if (changed && skipDelay?.(settled, value)) setSettled(value);

  useEffect(() => {
    if (!changed) return;
    const timer = setTimeout(() => setSettled(value), delay);
    return () => clearTimeout(timer);
  }, [changed, value, delay]);

  return [settled, changed];
};
