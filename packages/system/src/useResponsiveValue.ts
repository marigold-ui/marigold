/**
 * Based on https://theme-ui.com/packages/match-media/
 */
import { useEffect, useState } from 'react';
import { useTheme } from './useTheme';

/**
 * Hardcode fallback breakpoints, not make sure `useEffect`
 * doesn't trigger on every render. Since it is part of the
 * dependency array.
 */
const emptyBreakpoints: string[] = ['40em', '52em', '64em'];

/**
 * Hook that can be used to return values based on the current screen size,
 * using breakpoints from the theme (`theme.breakpoints`). Note that this
 * hook is client.side only.
 */
export const useResponsiveValue = <T>(
  values: T[],
  defaultIndex: number = 0
) => {
  const { theme } = useTheme();
  const breakpoints = theme.breakpoints || emptyBreakpoints;

  if (defaultIndex < 0 || defaultIndex >= breakpoints.length) {
    throw new RangeError(
      `Default breakpoint index is out of bounds. Theme has ${breakpoints.length} breakpoints, default is ${defaultIndex}.`
    );
  }

  const [index, setIndex] = useState(defaultIndex);
  useEffect(() => {
    const getIndex = () =>
      breakpoints.filter(
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
  }, [breakpoints, index]);

  // Return the index or last existing index of given values
  return values[index >= values.length ? values.length - 1 : index];
};
