import { useCallback, useEffect, useState } from 'react';

export const useSmallScreen = (): boolean => {
  const getMatches = (): boolean => {
    if (typeof window == 'undefined') {
      return false;
    }
    return window.matchMedia('(max-width: 600px)').matches;
  };

  const [matches, setMatches] = useState<boolean>(getMatches());

  const handleResize = useCallback(() => {
    setMatches(getMatches());
  }, []);
  useEffect(() => {
    // Triggered at the first client-side load and if query changes
    handleResize();
    if (typeof window == 'undefined') return;
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleResize]);

  return matches;
};
