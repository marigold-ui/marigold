import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const ExternalLink = forwardRef<SVGSVGElement, SVGProps>(
  (props, ref) => (
    <SVG {...props} viewBox="0 0 24 24" ref={ref}>
      <path
        stroke="currentColor"
        d="M18.5625 18.5625H5.4375V5.4375H12V3.5625H5.4375C4.39687 3.5625 3.5625 4.40625 3.5625 5.4375V18.5625C3.5625 19.5938 4.39687 20.4375 5.4375 20.4375H18.5625C19.5938 20.4375 20.4375 19.5938 20.4375 18.5625V12H18.5625V18.5625ZM13.8648 3.5625V5.44042H17.2356L8.00565 14.6704L9.32959 15.9943L18.5596 6.76436V10.1352H20.4375V3.5625H13.8648Z"
      />
    </SVG>
  )
);
