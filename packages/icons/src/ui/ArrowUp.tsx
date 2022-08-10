import React, { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const ArrowUp = forwardRef<SVGElement, SVGProps>((props, ref) => (
  <SVG {...props} ref={ref}>
    <path d="M3 12L4.58625 13.5863L10.875 7.30875V21H13.125V7.30875L19.4025 13.5975L21 12L12 3L3 12Z" />
  </SVG>
));
