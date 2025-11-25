import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const Underlined = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 24 24" ref={ref}>
    <path d="M17.9896 11.0417C17.9896 14.2138 15.4117 16.7917 12.2396 16.7917C9.0675 16.7917 6.48958 14.2138 6.48958 11.0417V3.375H8.88541V11.0417C8.88541 12.8913 10.39 14.3958 12.2396 14.3958C14.0892 14.3958 15.5938 12.8913 15.5938 11.0417V3.375H17.9896V11.0417ZM5.53125 20.625V18.7083H18.9479V20.625H5.53125Z" />
  </SVG>
));
