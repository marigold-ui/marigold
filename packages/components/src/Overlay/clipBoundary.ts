// A fixed element's containing block excludes the reserved scrollbar gutter,
// so this spans the box that actually clips. Workaround for adobe/react-spectrum#10131.
let boundary: HTMLElement | undefined;

export const getClipBoundary = () => {
  if (typeof document === 'undefined' || !document.body) {
    return undefined;
  }

  if (!boundary?.isConnected) {
    boundary = document.createElement('div');
    boundary.style.cssText =
      'position:fixed;inset:0;pointer-events:none;visibility:hidden';
    document.body.appendChild(boundary);
  }

  return boundary;
};
