import { useCallback, useMemo, useSyncExternalStore } from 'react';
import { resolveScreens } from './resolveScreens';
import { useTheme } from './useTheme';

export const useSmallScreen = (): boolean => {
  const theme = useTheme();
  const screens = resolveScreens(theme.screens);
  const sm = screens.sm;

  const query = useMemo(() => (sm ? `(width < ${sm})` : undefined), [sm]);

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (!query || typeof window == 'undefined') return () => {};

      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener('change', onStoreChange);
      return () => mediaQuery.removeEventListener('change', onStoreChange);
    },
    [query]
  );

  const getSnapshot = useCallback(() => {
    if (!query || typeof window == 'undefined') return false;
    return window.matchMedia(query).matches;
  }, [query]);

  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
