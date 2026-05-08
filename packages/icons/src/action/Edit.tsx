import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const Edit = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 24 24" ref={ref}>
    <path d="M4.125 16.5942V19.875H7.40579L17.082 10.1988L13.8012 6.91805L4.125 16.5942ZM19.6191 7.6617C19.9603 7.32049 19.9603 6.76932 19.6191 6.42812L17.5719 4.3809C17.2307 4.0397 16.6795 4.0397 16.3383 4.3809L14.7373 5.98193L18.0181 9.26272L19.6191 7.6617Z" />
  </SVG>
));
