import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const Play = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 24 24" ref={ref}>
    <path d="M6.69775 3.61865L19.8603 11.9999L6.69775 20.3812V3.61865Z" />
  </SVG>
));
