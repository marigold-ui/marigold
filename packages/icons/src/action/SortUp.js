import React from 'react';
import { SVG } from '@marigold/system';
export const SortUp = ({ className = '', ...props }) =>
  React.createElement(
    SVG,
    { className: className, ...props },
    React.createElement('path', {
      d: 'M16.9048 15.1491H7.12078C6.73856 15.1491 6.42188 14.8324 6.42188 14.4503C6.42188 14.2645 6.49827 14.0899 6.62934 13.9588L11.5214 9.06684C11.6524 8.93577 11.8272 8.85938 12.0128 8.85938C12.1984 8.85938 12.3731 8.93577 12.5042 9.06684L17.3962 13.9588C17.5273 14.0899 17.6037 14.2645 17.6037 14.4503C17.6037 14.8324 17.287 15.1491 16.9048 15.1491Z',
    })
  );
//# sourceMappingURL=SortUp.js.map
