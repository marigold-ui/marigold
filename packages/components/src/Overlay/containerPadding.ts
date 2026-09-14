import { useSyncExternalStore } from 'react';

const DEFAULT_CONTAINER_PADDING = 12;

const measureClipWidth = () => {
  const probe = document.createElement('div');
  probe.style.cssText =
    'position:fixed;top:0;left:0;right:0;height:0;visibility:hidden;pointer-events:none';

  document.body.appendChild(probe);
  const { width } = probe.getBoundingClientRect();
  probe.remove();

  return width;
};

let cached: { innerWidth: number; padding: number } | undefined;

const getContainerPadding = () => {
  if (typeof document === 'undefined' || !document.body) {
    return DEFAULT_CONTAINER_PADDING;
  }

  const { innerWidth } = window;

  if (cached?.innerWidth === innerWidth) {
    return cached.padding;
  }

  const reserved =
    getComputedStyle(document.documentElement).scrollbarGutter !== 'auto';
  const gutter = reserved ? innerWidth - measureClipWidth() : 0;

  cached = {
    innerWidth,
    padding: DEFAULT_CONTAINER_PADDING + Math.max(0, Math.ceil(gutter)),
  };

  return cached.padding;
};

const subscribeToViewport = (onChange: () => void) => {
  window.visualViewport?.addEventListener('resize', onChange);

  return () => window.visualViewport?.removeEventListener('resize', onChange);
};

export const useContainerPadding = () =>
  useSyncExternalStore(
    subscribeToViewport,
    getContainerPadding,
    () => DEFAULT_CONTAINER_PADDING
  );
