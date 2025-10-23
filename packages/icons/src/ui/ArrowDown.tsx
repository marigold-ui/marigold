import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const ArrowDown = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 24 24" ref={ref}>
    <path d="M21 12L19.4137 10.4138L13.125 16.6912V3H10.875V16.6912L4.5975 10.4025L3 12L12 21L21 12Z" />
  </SVG>
));
