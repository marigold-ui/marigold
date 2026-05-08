import { useEffect, useState } from 'react';
import { defaultTheme } from '../defaultTheme';

/**
 * Uses CSS Media Queries Level 4 range syntax, matching Tailwind v4's
 * `max-sm:` variant. This ensures the hook returns `true` for exactly
 * the screen widths where `max-sm:` styles apply.
 */
const smallScreenQuery = `(width < ${defaultTheme.screens.sm})`;

export const useSmallScreen = (): boolean => {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window == 'undefined') {
      return false;
    }
    return window.matchMedia(smallScreenQuery).matches;
  });

  useEffect(() => {
    if (typeof window == 'undefined') return;

    const mediaQuery = window.matchMedia(smallScreenQuery);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return matches;
};
