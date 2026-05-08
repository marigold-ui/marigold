import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const BurgerMenu = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 24 24" ref={ref}>
    <path d="M3.5625 6.375H20.4375V8.25H3.5625V6.375ZM3.5625 16.125H20.4375V18H3.5625V16.125ZM20.4375 11.25H3.5625V13.125H20.4375V11.25Z" />
  </SVG>
));
