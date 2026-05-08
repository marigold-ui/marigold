import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const Pickup = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 24 24" ref={ref}>
    <path d="M3.66667 3.65625V5.73958H20.3333V3.65625H3.66667ZM21.375 11.9896L20.3333 6.78129H3.66667L2.625 11.9896V14.073H3.66667V20.323H14.0833V14.073H18.25V20.323H20.3333V14.073H21.375V11.9896ZM5.75 18.2396V14.0729H12V18.2396H5.75Z" />
  </SVG>
));
