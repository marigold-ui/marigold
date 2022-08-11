import React, { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const SortDown = forwardRef<SVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 24 24" ref={ref}>
    <path d="M17.3962 10.0496L12.5042 14.9416C12.3731 15.0727 12.1984 15.1492 12.0128 15.1492C11.8272 15.1492 11.6524 15.0727 11.5214 14.9416L6.62934 10.0496C6.49827 9.91854 6.42188 9.7439 6.42188 9.55816C6.42188 9.17606 6.73856 8.85938 7.12078 8.85938H16.9048C17.287 8.85938 17.6037 9.17606 17.6037 9.55816C17.6037 9.7439 17.5273 9.91854 17.3962 10.0496Z" />
  </SVG>
));
