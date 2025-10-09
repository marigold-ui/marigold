import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const CheckMark = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG {...props} width={12} height={10} viewBox="0 0 12 10" ref={ref}>
    <path
      fill="currentColor"
      stroke="none"
      d="M11.915 1.548 10.367 0 4.045 6.315 1.557 3.827 0 5.373l4.045 4.046 7.87-7.871Z"
    />
  </SVG>
));
