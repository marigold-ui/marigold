import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const Parking = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 24 24" ref={ref}>
    <path d="M5.76562 3.375H12.474C15.646 3.375 18.224 5.95292 18.224 9.125C18.224 12.2971 15.646 14.875 12.474 14.875H9.59896V20.625H5.76562V3.375ZM9.59896 11.0417H12.6656C13.7198 11.0417 14.5823 10.1792 14.5823 9.125C14.5823 8.07084 13.7198 7.20834 12.6656 7.20834H9.59896V11.0417Z" />
  </SVG>
));
