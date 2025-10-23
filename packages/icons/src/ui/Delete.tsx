import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const Delete = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 24 24" ref={ref}>
    <path d="M14.9531 5H17.9062V6.75H6.09375V5H9.04688L9.89062 4.125H14.1094L14.9531 5ZM8.625 19.875C7.69688 19.875 6.9375 19.0875 6.9375 18.125V7.62502H17.0625V18.125C17.0625 19.0875 16.3031 19.875 15.375 19.875H8.625Z" />
  </SVG>
));
