import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const Phone = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 24 24" ref={ref}>
    <path d="M13.21 18.13L15.41 15.93C15.68 15.66 16.08 15.57 16.43 15.69C17.55 16.06 18.76 16.26 20 16.26C20.55 16.26 21 16.71 21 17.26V20.75C21 21.3 20.55 21.75 20 21.75C10.61 21.75 3 14.14 3 4.75C3 4.2 3.45 3.75 4 3.75H7.5C8.05 3.75 8.5 4.2 8.5 4.75C8.5 6 8.7 7.2 9.07 8.32C9.18 8.67 9.1 9.06 8.82 9.34L6.62 11.54C8.06 14.37 10.38 16.68 13.21 18.13Z" />
  </SVG>
));
