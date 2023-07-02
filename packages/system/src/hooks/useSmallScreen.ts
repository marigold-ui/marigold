import { useCallback, useEffect, useState } from 'react';

const smallScreenSize = '(max-width: 768px)';

export const useSmallScreen = (): boolean => {
  const getMatches = (): boolean => {
    // Prevents SSR issues
    if (typeof window !== 'undefined') {
      return window.matchMedia(smallScreenSize).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches());

  const handleChange = useCallback(() => {
    setMatches(getMatches());
  }, []);
  useEffect(() => {
    const matchMedia = window.matchMedia(smallScreenSize);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Listen matchMedia
    if (matchMedia.addEventListener) {
      matchMedia.addEventListener('change', handleChange);
    } else {
      matchMedia.addEventListener('change', handleChange);
    }

    return () => {
      if (matchMedia.removeEventListener) {
        matchMedia.removeEventListener('change', handleChange);
      } else {
        matchMedia.removeEventListener('change', handleChange);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleChange]);

  return matches;
};
