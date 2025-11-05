import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const Wifi = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 22 16" ref={ref}>
    <path
      fill="currentColor"
      d="M0 5.00001L2 7.00001C6.97 2.03001 15.03 2.03001 20 7.00001L22 5.00001C15.93 -1.06999 6.08 -1.06999 0 5.00001ZM8 13L11 16L14 13C12.35 11.34 9.66 11.34 8 13ZM4 9.00001L6 11C8.76 8.24001 13.24 8.24001 16 11L18 9.00001C14.14 5.14001 7.87 5.14001 4 9.00001Z"
    />
  </SVG>
));
