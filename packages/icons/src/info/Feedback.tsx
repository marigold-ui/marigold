import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const Feedback = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 24 24" ref={ref}>
    <path d="M19.2 3H4.8C3.81 3 3.009 3.81 3.009 4.8L3 21L6.6 17.4H19.2C20.19 17.4 21 16.59 21 15.6V4.8C21 3.81 20.19 3 19.2 3Z" />
  </SVG>
));
