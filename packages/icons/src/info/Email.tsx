import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const Email = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 24 24" ref={ref}>
    <path d="M19.2 4.78125H4.8C3.81 4.78125 3.009 5.59125 3.009 6.58125L3 17.3813C3 18.3713 3.81 19.1813 4.8 19.1813H19.2C20.19 19.1813 21 18.3713 21 17.3813V6.58125C21 5.59125 20.19 4.78125 19.2 4.78125ZM19.2 8.38125L12 12.8812L4.79999 8.38125V6.58125L12 11.0812L19.2 6.58125V8.38125Z" />
  </SVG>
));
