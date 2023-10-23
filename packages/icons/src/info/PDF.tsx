import React, { forwardRef } from 'react';

import { SVG, SVGProps } from '@marigold/system';

export const PDF = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 24 24" ref={ref}>
    <path
      d="M18 0H6C4.9 0 4 0.9 4 2V14C4 15.1 4.9 16 6 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 14H6V2H18V14ZM2 4H0V18C0 19.1 0.9 20 2 20H16V18H2V4ZM14 10V7C14 6.45 13.55 6 13 6H11V11H13C13.55 11 14 10.55 14 10ZM12 7H13V10H12V7ZM16 9H17V8H16V7H17V6H15V11H16V9ZM8 9H9C9.55 9 10 8.55 10 8V7C10 6.45 9.55 6 9 6H7V11H8V9ZM8 7H9V8H8V7Z"
      fill="#374151"
    />
  </SVG>
));
