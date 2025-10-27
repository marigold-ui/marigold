import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const Star = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 24 24" ref={ref}>
    <path d="M12 17.131L17.562 20.4568L16.086 14.1886L21 9.9711L14.529 9.4272L12 3.51562L9.471 9.4272L3 9.9711L7.914 14.1886L6.438 20.4568L12 17.131Z" />
  </SVG>
));
