import { useEffect, useState } from 'react';

export const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    // Use queueMicrotask to avoid synchronous state update in effect
    queueMicrotask(() => setHasMounted(true));
  }, []);
  return hasMounted;
};
