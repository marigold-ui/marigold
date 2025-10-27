import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const ChevronLeft = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 24 24" ref={ref}>
    <path d="M16.8506 18.0244L10.8394 12L16.8506 5.97563L15 4.125L7.125 12L15 19.875L16.8506 18.0244Z" />
  </SVG>
));
