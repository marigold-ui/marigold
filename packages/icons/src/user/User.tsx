import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const User = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 24 24" ref={ref}>
    <path d="M16.5 7.5C16.5 9.98625 14.4862 12 12 12C9.51375 12 7.5 9.98625 7.5 7.5C7.5 5.01375 9.51375 3 12 3C14.4862 3 16.5 5.01375 16.5 7.5ZM3 18.75C3 15.7575 8.99625 14.25 12 14.25C15.0037 14.25 21 15.7575 21 18.75V21H3V18.75Z" />
  </SVG>
));
