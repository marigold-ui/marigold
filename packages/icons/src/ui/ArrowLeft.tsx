import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const ArrowLeft = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 24 24" ref={ref}>
    <path d="M21 10.875H7.30875L13.5975 4.58625L12 3L3 12L12 21L13.5863 19.4137L7.30875 13.125H21V10.875Z" />
  </SVG>
));
