import React from 'react';
import { SVG } from '@marigold/system';
export const Direction = ({ className = '', ...props }) =>
  React.createElement(
    SVG,
    { className: className, ...props },
    React.createElement('path', {
      d: 'M21.8288 12.036L12.714 2.92123C12.319 2.52626 11.681 2.52626 11.286 2.92123L2.17123 12.036C1.77626 12.431 1.77626 13.069 2.17123 13.464L11.286 22.5788C11.681 22.9737 12.319 22.9737 12.714 22.5788L21.8288 13.464C22.2237 13.0791 22.2237 12.4411 21.8288 12.036ZM14.0204 15.2869V12.755H9.96944V15.7933H7.94393V11.7423C7.94393 11.1853 8.39967 10.7295 8.95668 10.7295H14.0204V8.19765L17.5651 11.7423L14.0204 15.2869Z',
    })
  );
//# sourceMappingURL=Direction.js.map
