import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const MobileSignal = forwardRef<SVGSVGElement, SVGProps>(
  (props, ref) => (
    <SVG {...props} viewBox="0 0 15 16" ref={ref}>
      <path
        fill="currentColor"
        d="M0 16V10H3V16H0ZM6 16V5H9V16H6ZM12 16V0H15V16H12Z"
      />
    </SVG>
  )
);
