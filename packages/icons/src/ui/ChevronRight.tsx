import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const ChevronRight = forwardRef<SVGSVGElement, SVGProps>(
  (props, ref) => (
    <SVG {...props} viewBox="0 0 24 24" ref={ref}>
      <path d="M7.125 18.0244L13.1363 12L7.125 5.97563L8.97563 4.125L16.8506 12L8.97563 19.875L7.125 18.0244Z" />
    </SVG>
  )
);
