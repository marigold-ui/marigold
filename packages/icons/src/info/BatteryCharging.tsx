import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const BatteryCharging = forwardRef<SVGSVGElement, SVGProps>(
  (props, ref) => (
    <SVG {...props} viewBox="0 0 10 20" ref={ref}>
      <path
        fill="currentColor"
        d="M8.67 2H7V0H3V2H1.33C0.6 2 0 2.6 0 3.33V18.66C0 19.4 0.6 20 1.33 20H8.66C9.4 20 10 19.4 10 18.67V3.33C10 2.6 9.4 2 8.67 2ZM4 18V12.5H2L6 5V10.5H8L4 18Z"
      />
    </SVG>
  )
);
