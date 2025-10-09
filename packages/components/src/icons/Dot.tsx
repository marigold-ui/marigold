import React, { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const Dot = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG viewBox="0 0 6 6" {...props} ref={ref}>
    <circle fill="currentColor" cx="3" cy="3" r="3" />
  </SVG>
));
