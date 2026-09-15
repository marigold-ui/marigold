import { useLayoutEffect } from 'react';

// An absolutely positioned element resolves against the initial containing block,
// which excludes the reserved scrollbar gutter, so this spans the box that actually
// clips. Not `fixed`: react-aria reads a non-body boundary in document coordinates,
// and a fixed element reports viewport ones, which throws the flip and max-height
// maths off by the scroll offset. Workaround for adobe/react-spectrum#10131.
let boundary: HTMLElement | undefined;

export const getClipBoundary = () => {
  if (!boundary) {
    boundary = document.createElement('div');
    boundary.style.cssText =
      'position:absolute;inset:0;pointer-events:none;visibility:hidden';
  }

  if (!boundary.isConnected) {
    document.body.appendChild(boundary);
  }

  return boundary;
};

if (typeof document !== 'undefined' && document.body) {
  getClipBoundary();
}

export const useClipBoundary = () => {
  useLayoutEffect(() => {
    getClipBoundary();
  }, []);

  return boundary?.isConnected ? boundary : undefined;
};
