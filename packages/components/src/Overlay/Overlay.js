import React from 'react';
import { OverlayContainer } from '@react-aria/overlays';
import { Box } from '../Box';
export const Overlay = ({ children, open = false, container, ...props }) => {
  if (!open) {
    return null;
  }
  return React.createElement(
    OverlayContainer,
    { portalContainer: container },
    React.createElement(Box, { ...props }, children)
  );
};
//# sourceMappingURL=Overlay.js.map
