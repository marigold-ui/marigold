import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const FormatSize = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 24 24" ref={ref}>
    <path d="M8.82237 8.25493V5.53125H20.625V8.25493H16.0855V19.1497H13.3618V8.25493H8.82237ZM6.09868 12.7944H3.375V10.0707H11.5461V12.7944H8.82237V19.1496H6.09868V12.7944Z" />
  </SVG>
));
