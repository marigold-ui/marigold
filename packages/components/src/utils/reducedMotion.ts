/**
 * Whether the user has `prefers-reduced-motion: reduce` set. Sampled once at
 * module evaluation so the value is stable across renders and SSR-safe.
 *
 * Components that need to honour reduced motion import this constant and gate
 * their transitions on it. If a user toggles the OS setting after the page has
 * loaded, a full reload is required — acceptable trade-off for components
 * where a listener would add cost for a preference that changes rarely.
 */
export const reducedMotion =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
