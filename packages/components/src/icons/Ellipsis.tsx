import React, { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const Ellipsis = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
    ref={ref}
  >
    <circle cx={12} cy={12} r={1} fill="none" />
    <circle cx={12} cy={5} r={1} fill="none" />
    <circle cx={12} cy={19} r={1} fill="none" />
  </SVG>
));
