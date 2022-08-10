import React, { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const Add = forwardRef<SVGElement, SVGProps>((props, ref) => (
  <SVG {...props} ref={ref}>
    <path d="M13.1917 13.1917V20.25H10.8083V13.1917H3.75V10.8083H10.8083V3.75H13.1917V10.8083H20.25V13.1917H13.1917Z" />
  </SVG>
));
