import { useCallback, useMemo, useSyncExternalStore } from 'react';
import { resolveScreens } from './resolveScreens';
import { useTheme } from './useTheme';

/**
 * Hook that can be used to return values based on the current screen size,
 * using breakpoints from the theme (`theme.screens`). Note that this
 * hook is client-side only.
 */
export const useResponsiveValue = <T>(
  values: T[],
  defaultIndex: number = 0
) => {
  const theme = useTheme();
  const screens = useMemo(() => resolveScreens(theme.screens), [theme.screens]);

  if (defaultIndex < 0 || defaultIndex >= Object.keys(screens).length + 1) {
    throw new RangeError(
      `Default breakpoint index is out of bounds. Theme has ${
        Object.keys(screens).length + 1
      } breakpoints, default is ${defaultIndex}.`
    );
  }

  const queries = useMemo(
    () =>
      Object.values(screens).map(
        breakpoint => `screen and (min-width: ${breakpoint})`
      ),
    [screens]
  );

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (typeof window == 'undefined') return () => {};

      const mediaQueries = queries.map(q => window.matchMedia(q));
      mediaQueries.forEach(mq => mq.addEventListener('change', onStoreChange));
      return () =>
        mediaQueries.forEach(mq =>
          mq.removeEventListener('change', onStoreChange)
        );
    },
    [queries]
  );

  const getSnapshot = useCallback(() => {
    if (typeof window == 'undefined') return defaultIndex;
    return queries.filter(q => window.matchMedia(q).matches).length;
  }, [queries, defaultIndex]);

  const getServerSnapshot = useCallback(() => defaultIndex, [defaultIndex]);

  const index = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Return the index or last existing index of given values
  return values[index >= values.length ? values.length - 1 : index];
};
