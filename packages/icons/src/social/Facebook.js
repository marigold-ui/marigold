import React from 'react';
import { SVG } from '@marigold/system';
export const Facebook = ({ className = '', ...props }) =>
  React.createElement(
    SVG,
    { className: className, ...props },
    React.createElement('path', {
      d: 'M20.5312 12.005C20.5312 7.29055 16.7117 3.46875 12 3.46875C7.28832 3.46875 3.46875 7.29055 3.46875 12.005C3.46875 16.2657 6.5885 19.7971 10.667 20.4375V14.4725H8.50085V12.005H10.667V10.1243C10.667 7.98495 11.9406 6.80321 13.8894 6.80321C14.8228 6.80321 15.7991 6.96994 15.7991 6.96994V9.07065H14.7233C13.6635 9.07065 13.333 9.72865 13.333 10.4037V12.005H15.6991L15.3209 14.4725H13.333V20.4375C17.4115 19.7971 20.5312 16.2657 20.5312 12.005Z',
    })
  );
//# sourceMappingURL=Facebook.js.map
