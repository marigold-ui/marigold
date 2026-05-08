import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const Remove = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 24 24" ref={ref}>
    <path d="M20.25 13.5603H3.75V11.2031H20.25V13.5603Z" />
  </SVG>
));
