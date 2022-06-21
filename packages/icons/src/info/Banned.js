import React from 'react';
import { SVG } from '@marigold/system';
export const Banned = ({ className = '', ...props }) =>
  React.createElement(
    SVG,
    { className: className, ...props },
    React.createElement('path', {
      d: 'M11.8649 18.4904C10.5915 18.4904 9.40503 18.1231 8.39423 17.4979L17.4979 8.39422C18.1231 9.40503 18.4904 10.5915 18.4904 11.8649C18.4904 15.5181 15.5181 18.4904 11.8649 18.4904ZM12.1351 5.50958C13.4085 5.50958 14.595 5.87686 15.6058 6.50203L6.50207 15.6057C5.8769 14.5949 5.50961 13.4085 5.50961 12.135C5.50961 8.48185 8.48189 5.50958 12.1351 5.50958ZM12 2.625C6.83059 2.625 2.625 6.83059 2.625 12C2.625 17.1694 6.83059 21.375 12 21.375C17.1694 21.375 21.375 17.1694 21.375 12C21.375 6.83059 17.1694 2.625 12 2.625Z',
    })
  );
//# sourceMappingURL=Banned.js.map
