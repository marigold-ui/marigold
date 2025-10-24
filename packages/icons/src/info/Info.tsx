import { forwardRef } from 'react';
import { SVG, SVGProps } from '@marigold/system';

export const Info = forwardRef<SVGSVGElement, SVGProps>((props, ref) => (
  <SVG {...props} viewBox="0 0 24 24" ref={ref}>
    <path d="M12 2.85938C6.95437 2.85938 2.85938 6.95437 2.85938 12C2.85938 17.0456 6.95437 21.1406 12 21.1406C17.0456 21.1406 21.1406 17.0456 21.1406 12C21.1406 6.95437 17.0456 2.85938 12 2.85938ZM12.7875 15.9374H11.2125V11.2124H12.7875V15.9374ZM12.7875 9.6375H11.2125V8.0625H12.7875V9.6375Z" />
  </SVG>
));
