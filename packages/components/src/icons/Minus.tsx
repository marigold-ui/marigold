import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const Minus = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG {...props} width={16} height={16} viewBox="0 0 20 20" ref={ref}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      fill="currentColor"
      d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
    />
  </SVG>
));
