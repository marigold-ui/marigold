import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const Home = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 24 24" ref={ref}>
    <path d="M9.9 20.113V13.8415H14.1V20.113H19.35V11.751H22.5L12 2.34375L1.5 11.751H4.65V20.113H9.9Z" />
  </SVG>
));
