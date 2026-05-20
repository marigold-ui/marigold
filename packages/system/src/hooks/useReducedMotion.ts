import { useSyncExternalStore } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const subscribe = (callback: () => void) => {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return () => {};
  }
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
};

const getSnapshot = () =>
  typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia(REDUCED_MOTION_QUERY).matches
    : false;

const getServerSnapshot = () => false;

/**
 * Returns whether the user has requested reduced motion via the
 * `prefers-reduced-motion: reduce` media query. Reactive to changes.
 */
export const useReducedMotion = (): boolean =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
