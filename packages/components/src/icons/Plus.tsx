import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const Plus = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG {...props} width={16} height={16} viewBox="0 0 20 20" ref={ref}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      fill="currentColor"
      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
    />
  </SVG>
));
