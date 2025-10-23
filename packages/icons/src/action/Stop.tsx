import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const Stop = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 24 24" ref={ref}>
    <path d="M4.76953 4.86328H19.1836V19.2773H4.76953V4.86328Z" />
  </SVG>
));
