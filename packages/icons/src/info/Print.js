import React from 'react';
import { SVG } from '@marigold/system';
export const Print = ({ className = '', ...props }) =>
  React.createElement(
    SVG,
    { className: className, ...props },
    React.createElement('path', {
      d: 'M18.5625 8.25H5.4375C3.88125 8.25 2.625 9.50625 2.625 11.0625V16.6875H6.375V20.4375H17.625V16.6875H21.375V11.0625C21.375 9.50625 20.1187 8.25 18.5625 8.25ZM15.75 18.5625H8.25V13.875H15.75V18.5625ZM18.5625 12C18.0469 12 17.625 11.5781 17.625 11.0625C17.625 10.5469 18.0469 10.125 18.5625 10.125C19.0781 10.125 19.5 10.5469 19.5 11.0625C19.5 11.5781 19.0781 12 18.5625 12ZM17.625 3.5625H6.375V7.3125H17.625V3.5625Z',
    })
  );
//# sourceMappingURL=Print.js.map
