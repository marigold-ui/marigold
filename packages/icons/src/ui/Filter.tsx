import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const Filter = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 24 24" ref={ref}>
    <path d="M3 6V8H21V6H3ZM10 18H14V16H10V18ZM18 13H6V11H18V13Z" />
  </SVG>
));
