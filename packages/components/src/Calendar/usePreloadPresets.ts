import { useEffect } from 'react';

/**
 * Warms the lazily loaded preset UI chunk (`CalendarPresets.jsx`) ahead of
 * first use. The pickers mount their calendar only when the overlay opens,
 * so without this the chunk fetch would start mid-display and the open
 * popover reflows once the preset rail arrives. Fetching on mount instead
 * uses the idle time before the first open. The import resolves to the same
 * chunk the calendars' `lazy()` calls load, so this is a cache warm-up, not
 * a second download. A failed preload is swallowed: the calendar's Suspense
 * path imports again at render time and owns the error handling.
 */
export const usePreloadPresets = (hasPresets: boolean) =>
  useEffect(() => {
    if (!hasPresets) return;
    import('./CalendarPresets.jsx').catch(() => {});
  }, [hasPresets]);
