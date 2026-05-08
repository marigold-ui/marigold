import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const Food = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 24 24" ref={ref}>
    <path d="M11.1938 9.525H9.54375V3.75H7.89375V9.525H6.24375V3.75H4.59375V9.525C4.59375 11.274 5.96325 12.693 7.6875 12.8003V20.25H9.75V12.8003C11.4742 12.693 12.8438 11.274 12.8438 9.525V3.75H11.1938V9.525ZM15.3188 7.05V13.65H17.3813V20.25H19.4438V3.75C17.1668 3.75 15.3188 5.598 15.3188 7.05Z" />
  </SVG>
));
