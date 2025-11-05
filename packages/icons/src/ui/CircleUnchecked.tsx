import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const CircleUnchecked = forwardRef<SVGSVGElement, SVGProps>(
  (props, ref) => (
    <SVG {...props} viewBox="0 0 24 24" ref={ref}>
      <path d="M5.62507 12C5.62507 15.5157 8.48442 18.375 12.0001 18.375C15.5157 18.375 18.375 15.5157 18.375 12C18.375 8.48438 15.5157 5.62502 12.0001 5.62502C8.48442 5.62502 5.62507 8.48438 5.62507 12ZM12 21.0001C7.03127 21.0001 3 16.9688 3 12C3 7.03127 7.03127 3 12 3C16.9687 3 21 7.03127 21 12C21 16.9688 16.9687 21.0001 12 21.0001Z" />
    </SVG>
  )
);
