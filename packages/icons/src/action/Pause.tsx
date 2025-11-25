import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const Pause = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 24 24" ref={ref}>
    <path d="M14.4134 3.61877H19.1946V20.3813H14.4134V3.61877ZM4.79462 20.3813V3.61877H9.57587V20.3813H4.79462Z" />
  </SVG>
));
