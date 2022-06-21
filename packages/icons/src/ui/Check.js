import React from 'react';
import { SVG } from '@marigold/system';
export const Check = ({ className = '', ...props }) =>
  React.createElement(
    SVG,
    { className: className, ...props },
    React.createElement('path', {
      d: 'M8.17368 16.6154L3.19528 11.637L1.5 13.3204L8.17368 19.994L22.5 5.66772L20.8167 3.98437L8.17368 16.6154Z',
    })
  );
//# sourceMappingURL=Check.js.map
