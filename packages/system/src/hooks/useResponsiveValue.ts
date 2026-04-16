/**
 * Based on https://theme-ui.com/packages/match-media/
 */
import { useEffect, useState } from 'react';
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
  const screens = resolveScreens(theme.screens);

  if (defaultIndex < 0 || defaultIndex >= Object.keys(screens).length + 1) {
    throw new RangeError(
      `Default breakpoint index is out of bounds. Theme has ${
        Object.keys(screens).length + 1
      } breakpoints, default is ${defaultIndex}.`
    );
  }

  const [index, setIndex] = useState(defaultIndex);
  useEffect(() => {
    if (typeof window == 'undefined') return;
    const getIndex = () =>
      Object.values(screens).filter(
        breakpoint =>
          window.matchMedia(`screen and (min-width: ${breakpoint})`).matches
      ).length;

    const handleResize = () => {
      const newIndex = getIndex();
      if (index !== newIndex) {
        setIndex(newIndex);
      }
    };

    // Trigger resize on mount
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [screens, index]);

  // Return the index or last existing index of given values
  return values[index >= values.length ? values.length - 1 : index];
};
