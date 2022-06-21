import React from 'react';
import { SVG } from '@marigold/system';
export const Remove = ({ className = '', ...props }) =>
  React.createElement(
    SVG,
    { className: className, ...props },
    React.createElement('path', {
      d: 'M20.25 13.5603H3.75V11.2031H20.25V13.5603Z',
    })
  );
//# sourceMappingURL=Remove.js.map
