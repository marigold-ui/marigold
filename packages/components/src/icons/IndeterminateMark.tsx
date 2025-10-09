import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const IndeterminateMark = forwardRef<SVGSVGElement, SVGProps>(
  (props, ref) => (
    <SVG {...props} width={12} height={3} viewBox="0 0 12 3" ref={ref}>
      <path
        fill="currentColor"
        stroke="none"
        d="M11.5 2.04018H0.5V0.46875H11.5V2.04018Z"
      />
    </SVG>
  )
);
