import React from 'react';
import { Box, useComponentStyles } from '@marigold/system';
// Component
// ---------------
export const Underlay = ({ size, variant, ...props }) => {
  const styles = useComponentStyles('Underlay', { size, variant });
  return React.createElement(Box, {
    __baseCSS: {
      position: 'fixed',
      inset: 0,
      zIndex: 1,
    },
    css: styles,
    ...props,
  });
};
//# sourceMappingURL=Underlay.js.map
