import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const BatteryHalf = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 10 20" ref={ref}>
    <path
      fill="currentColor"
      d="M1 20C0.716667 20 0.479 19.904 0.287 19.712C0.0956668 19.5207 0 19.2833 0 19V3C0 2.71667 0.0956668 2.479 0.287 2.287C0.479 2.09567 0.716667 2 1 2H3V0H7V2H9C9.28333 2 9.52067 2.09567 9.712 2.287C9.904 2.479 10 2.71667 10 3V19C10 19.2833 9.904 19.5207 9.712 19.712C9.52067 19.904 9.28333 20 9 20H1ZM2 10H8V4H2V10Z"
    />
  </SVG>
));
