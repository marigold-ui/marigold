import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const Close = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 24 24" ref={ref}>
    <path d="M19.8281 5.74868L18.2513 4.17188L12 10.4232L5.74868 4.17188L4.17188 5.74868L10.4232 12L4.17188 18.2513L5.74868 19.8281L12 13.5768L18.2513 19.8281L19.8281 18.2513L13.5768 12L19.8281 5.74868Z" />
  </SVG>
));
