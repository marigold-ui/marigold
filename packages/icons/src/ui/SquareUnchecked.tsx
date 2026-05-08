import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const SquareUnchecked = forwardRef<SVGSVGElement, SVGProps>(
  (props, ref) => (
    <SVG {...props} viewBox="0 0 24 24" ref={ref}>
      <path d="M19.2917 4.70833V19.2917H4.70833V4.70833H19.2917ZM19.2917 2.625H4.70833C3.5625 2.625 2.625 3.5625 2.625 4.70833V19.2917C2.625 20.4375 3.5625 21.375 4.70833 21.375H19.2917C20.4375 21.375 21.375 20.4375 21.375 19.2917V4.70833C21.375 3.5625 20.4375 2.625 19.2917 2.625Z" />
    </SVG>
  )
);
